const keys = require('./keys');
const nebUtil = require('nebjs-util');
const objPick = nebUtil.object.pick;
const arrCopy = nebUtil.array.copy;

/**
 * 遍历属性中的所有KEY并转入栈中，待进一步处理..
 * @param props {Object}
 * {
 *  schemasStack: {}, 模型栈
 *  dataStack: {}, 数据栈
 *  upStackItem: {}, 指向上级有关栈元素
 *  schemaFrom: {}, 模型
 *  errors: [], 错误
 *  data: {}, 数据
 *  dataFrom: {}, 数据来源
 *  dataName: '', 数据来源属性名称
 * }
 *
 // 模型栈结构: keyword, schema, schemaFrom, keyPath, upStackItem, childStackItems, errors, state, dataNum, dataIndex
 // 数据栈结构: dataName, data, dataFrom, dataPath
 */
const schemaProperties = function (props) {
  const {schemasStack, upStackItem = null, dataStack, dataFrom = null, dataName, data} = props, upKeyPath = upStackItem ? upStackItem.keyPath + '/' + upStackItem.keyword : '';
  let {schemaFrom} = props;
  let doIt = false;
  if (schemaFrom) {
    const isArr = (Array.isArray(schemaFrom) && schemaFrom.length > 0), isObj = schemaFrom.constructor === Object;
    if (isArr || isObj) {
      let dataIndex, keyPath, thisData;
      if (data !== undefined) {
        dataIndex = dataStack.length;
        keyPath = upKeyPath + (dataName !== undefined ? '/' + dataName : '');
        let dataPath;
        if (upStackItem) {
          const dataStackItem = dataStack[upStackItem.dataIndex];
          dataPath = dataStackItem.dataPath + '/' + dataStackItem.dataName;
        } else {
          dataPath = '';
        }
        thisData = {dataName: dataName !== undefined ? dataName : '', data, dataFrom, dataPath};
      } else {
        keyPath = upKeyPath;
        dataIndex = upStackItem ? upStackItem.dataIndex : dataStack.length - 1;
      }
      const schemaLen = schemasStack.length;
      if (isObj) schemaFrom = [schemaFrom];
      const schLen = schemaFrom.length;
      for (let i = 0; i < schLen; ++i) {
        const schFrom = schemaFrom[i];
        if (schFrom && schFrom.constructor === Object) {
          for (const key of keys.regKeys) {
            const keyword = key.name;
            let rawSchema = schFrom[keyword];
            if (rawSchema !== undefined) {
              const {array} = keys.regKeywords[keyword].option.schema;
              const schema = array && !Array.isArray(rawSchema) ? [rawSchema] : rawSchema;
              const stkItem = {keyword, schema, rawSchema, schFrom, keyPath, upStackItem, childStackItems: [], errors: [], state: 0, data: thisData, dataNum: 0, dataIndex};
              if (isArr) stkItem.schemaFromIndex = i;
              if (upStackItem) upStackItem.childStackItems.push(stkItem);
              schemasStack.push(stkItem);
            }
          }
        }
      }
      if (schemasStack.length > schemaLen) {
        if (data !== undefined) {
          dataStack.push(thisData);
          if (upStackItem) upStackItem.dataNum++;
        }
        doIt = true;
      }
    }
  }
  return doIt;
};
/**
 * 用于类型判断的缓存
 * @type {*}
 */
const validTypesCache = {
  null: function (data) {
    return data === null;
  },
  boolean: 'boolean',
  object: function (data) {
    return data && typeof data === 'object' && !Array.isArray(data);
  },
  array: function (data) {
    return data && Array.isArray(data);
  },
  number: "number",
  integer: function (data) {
    return typeof data === 'number' && data % 1 === 0;
  },
  string: "string",
};
/**
 * 数据符合类型判断
 * @param types 类型
 * @param data 数据
 * @return {boolean}
 */
const validTypes = function (types, data) {
  let valid = false;
  for (const tp of types) {
    const type = validTypesCache[tp];
    if (type) {
      if (typeof type === 'string') {
        valid = typeof data === type;
      } else if (typeof type === 'function') {
        valid = type(data);
      }
      if (valid) break;
    }
  }
  return valid;
};
/**
 * 验证模型
 * @param schemaStackItem {Object}, 要验证的模型栈片，不传时默认为模型栈的栈顶
 */
const validateSchema = function (schemaStackItem) {
  const {keyword, schema, keyPath} = schemaStackItem, {schema: optSchema} = keys.regKeywords[keyword].option, {valid} = optSchema;
  if (valid) {
    const {array} = optSchema, {types, value} = valid;
    if (types.length > 0) {
      let isValid = false;
      if (array) {
        const len = schema.length;
        for (let i = 0; i < len; ++i) {
          isValid = validTypes(types, schema[i]);
        }
      } else isValid = validTypes(types, schema);
      if (!isValid) throw new TypeError('scheme error, keyword\'s values invalid at "' + keyPath + keyword + '" by types');
    }
    if (value && !value.call(this, schema)) throw new TypeError('scheme error, keyword\'s value invalid at "' + keyPath + '/' + keyword + '" by value');
  }
};

/**
 * 验证数据对象
 * @param data {Object|Array}
 * @return {Boolean}
 */
const validate = function (data) {
  this.data = data;
  const errors = [], schemasStack = [], dataStack = [], schemas = this.schemas;
  schemaProperties({schemasStack, dataStack, schemaFrom: schemas, data, dataFrom: null});
  while (schemasStack.length > 0) {
    const schemaStackItem = schemasStack[schemasStack.length - 1], {keyword} = schemaStackItem, option = keys.regKeywords[keyword].option;
    let {state} = schemaStackItem, pop = false;
    if (!(state < 0)) {
      const {data} = option, {valid: dataValid} = data;
      if (state === 0) validateSchema(schemaStackItem);
      if (dataValid) {
        dataValid.call(this, schemasStack, dataStack);
        state = schemaStackItem.state;
        if (state < 0) pop = true;
      } else pop = true;
    } else pop = true;
    if (pop) {
      const {upStackItem, errors: itemErrors, dataNum} = schemaStackItem;
      if (state === -1 && itemErrors.length > 0) {
        const to = upStackItem ? upStackItem.errors : errors;
        for (const err of itemErrors) {
          to.push(err);
        }
      }
      if (dataNum > 0) dataStack.splice(dataStack.length - dataNum, dataNum);
      schemasStack.pop();
    }
  }
  this.errors = arrCopy([], errors, {
    multi: true, filter: function (array, elements, element/*, index*/) {
      return {value: objPick({}, element, {pick: ['data', 'keyword', 'keyPath', 'schema', 'rawSchema']})};
    }
  });
  return errors.length === 0;
};
module.exports = {validate, schemaProperties};

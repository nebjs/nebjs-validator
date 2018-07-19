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
 *  schemasFrom: {}, 模型
 *  errors: [], 错误
 *  data: {}, 数据
 *  dataFrom: {}, 数据来源
 *  dataName: '', 数据来源属性名称
 * }
 *
 // 模型栈结构: keyword, schemas, schema, schemaIndex: i, schemaFrom, keyPath, upStackItem, errors, state, schemasFrom, schemaFromIndex, dataNum, dataIndex
 // 数据栈结构: dataName, data, dataFrom, dataPath
 */
const schemaProperties = function (props) {
  const {schemasStack, upStackItem = null, dataStack, dataFrom = null, dataName} = props, upKeyPath = upStackItem ? upStackItem.keyPath + '/' + upStackItem.keyword : '';
  let {schemasFrom, data} = props;
  // schemasFrom: [{required: ['xxx', 'xxx'], type: ['xxx', 'xxx']}]
  let doIt = false;
  if (!Array.isArray(schemasFrom)) schemasFrom = [schemasFrom];
  const schemasFromLen = schemasFrom.length;
  if (schemasFromLen > 0) {
    const schemaLen = schemasStack.length;
    // schemaFrom: {required: ['xxx', 'xxx'], type: ['xxx', 'xxx']}
    for (let i = 0; i < schemasFromLen; ++i) {
      const schemaFrom = schemasFrom[i];
      if (schemaFrom && schemaFrom.constructor === Object) {
        for (const key of keys.regKeys) {
          // keyword: required/types..
          const keyword = key.name;
          // schemas: ['xxx', 'xxx']
          const rawSchema = schemaFrom[keyword];
          if (rawSchema !== undefined) {
            const option = keys.regKeywords[keyword].option, {schema} = option, {merge, only} = schema;
            let schemas = only ? [rawSchema] : (Array.isArray(rawSchema) ? rawSchema : [rawSchema]);
            const keyPath = data !== undefined ? upKeyPath + (dataName !== undefined ? '/' + dataName : '') : upKeyPath;
            if (merge) {
              const dataIndex = data !== undefined ? dataStack.length : upStackItem ? upStackItem.dataIndex : dataStack.length - 1,
                stkItem = {
                  keyword, schemas, schema: schemas, schemaIndex: null, schemaFrom, rawSchema, keyPath, upStackItem, childStackItems: [], errors: [], state: 0,
                  schemasFrom: schemasFrom, schemaFromIndex: i, dataNum: 0, dataIndex
                };
              if (upStackItem) upStackItem.childStackItems.push(stkItem);
              schemasStack.push(stkItem);
            } else {
              const schemasLen = schemas.length;
              if (schemasLen > 0) {
                const dataIndex = data !== undefined ? dataStack.length : dataStack.length - 1;
                for (let j = 0; j < schemasLen; ++j) {
                  const schema = schemas[j], stkItem = {
                    keyword, schemas, schema, schemaIndex: j, schemaFrom, rawSchema, keyPath, upStackItem, childStackItems: [], errors: [], state: 0,
                    schemasFrom: schemasFrom, schemaFromIndex: i, dataNum: 0, dataIndex
                  };
                  if (upStackItem) upStackItem.childStackItems.push(stkItem);
                  schemasStack.push(stkItem);
                }
              }
            }
          }
        }
      }
    }
    if (schemasStack.length > schemaLen) {
      if (data !== undefined) {
        let dataPath;
        if (upStackItem) {
          const dataStackItem = dataStack[upStackItem.dataIndex];
          dataPath = dataStackItem.dataPath + '/' + dataStackItem.dataName;
        } else {
          dataPath = '';
        }
        dataStack.push({dataName: dataName !== undefined ? dataName : '', data, dataFrom, dataPath});
        if (upStackItem) upStackItem.dataNum++;
      }
      doIt = true;
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
 * @param schemasStack {Array}, 模型栈
 * @param validSchemaStackItem {Object}, 要验证的模型栈片，不传时默认为模型栈的栈顶
 */
const validateSchema = function (schemasStack, validSchemaStackItem) {
  if (validSchemaStackItem === undefined) validSchemaStackItem = schemasStack[schemasStack.length - 1];
  const {keyword, schemas, keyPath} = validSchemaStackItem, option = keys.regKeywords[keyword].option, {schema} = option, {valid: schemaValid} = schema;
  if (schemaValid) {
    const {types, maxItems, equal, not, value, values} = schemaValid, len = schemas.length;
    if (maxItems > 0 && len > maxItems) throw new TypeError('scheme error, keyword\'s values invalid at "' + keyPath + keyword + '" by maxItem');
    for (let i = 0; i < len; ++i) {
      const val = schemas[i];
      if (types.length > 0 && !validTypes(types, val)) throw new TypeError('scheme error, keyword\'s values invalid at "' + keyPath + keyword + '" by types');
      if (equal.length > 0 && !equal.includes(val)) throw new TypeError('scheme error, keyword\'s values invalid at "' + keyPath + keyword + '" by equal');
      if (not.length > 0 && not.includes(val)) throw new TypeError('scheme error, keyword\'s values invalid at "' + keyPath + keyword + '" by not');
      if (value && !value.call(this, schemasStack, val, i)) throw new TypeError('scheme error, keyword\'s values invalid at "' + keyPath + keyword + '" by value');
      if (values && !values.call(this, schemasStack)) throw new TypeError('scheme error, keyword\'s values invalid at "' + keyPath + keyword + '" by values');
    }
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
  schemaProperties({schemasStack, dataStack, schemasFrom: schemas, data, dataFrom: null});
  while (schemasStack.length > 0) {
    const schemaStackItem = schemasStack[schemasStack.length - 1], {keyword} = schemaStackItem, option = keys.regKeywords[keyword].option;
    let {state} = schemaStackItem, pop = false;
    if (!(state < 0)) {
      const {data} = option, {valid: dataValid} = data;
      if (state === 0) validateSchema(schemasStack, schemaStackItem);
      if (dataValid) {
        dataValid.call(this, schemasStack, dataStack);
        state = schemaStackItem.state;
        if (state < 0) {
          pop = true;
        }
      } else {
        pop = true;
      }
    } else {
      pop = true;
    }
    if (pop) {
      const {upStackItem, errors: itemErrors, dataNum: itemDataNum} = schemaStackItem;
      if (state === -1 && itemErrors.length > 0) {
        const to = upStackItem ? upStackItem.errors : errors;
        for (const err of itemErrors) {
          to.push(err);
        }
      }
      if (itemDataNum > 0) dataStack.splice(dataStack.length - itemDataNum, itemDataNum);
      schemasStack.pop();
    }
  }
  this.errors = arrCopy([], errors, {
    multi: true, filter: function (array, elements, element/*, index*/) {
      return {value: objPick({}, element, {pick: ['keyword', 'keyPath']})};
    }
  });
  return errors.length === 0;
};
module.exports = {validate, schemaProperties};


/**
 * 遍历属性中的所有KEY并转入栈中，待进一步处理..
 * @param props {Object}
 * {
 *  schemasStack: {}, 模型栈
 *  dataStack: {}, 数据栈
 *  upStackItem: {}, 指向上级有关栈元素
 *  schemas: {}, 模型
 *  keyPath: '',  模型路径
 *  errors: [], 错误,
 *  dataFrom: {}, 数据
 *  dataName: '',
 *  dataPath: '',
 *  data: {}
 * }
 */
/*const createProperties = function (props) {
  const {schemasStack, upStackItem = null, keyPath = '', errors = [], dataStack} = props;
  let {schemas: schemasFrom} = props;
  if (schemasFrom) {
    if (!Array.isArray(schemasFrom)) schemasFrom = [schemasFrom];
    if (schemasFrom.length > 0) {
      const schemaLen = schemasStack.length;
      // schemasFrom: [{required: ['xxx', 'xxx'], type: ['xxx', 'xxx']}]
      for (const schemaFrom of schemasFrom) {
        // schemaFrom: {required: ['xxx', 'xxx'], type: ['xxx', 'xxx']}
        if (schemaFrom && schemaFrom.constructor === Object) {
          for (const key of keys.regKeys) {
            // keyword: required/types..
            const keyword = key.name/!*, topStack = schemasStack.length > 0 ? schemasStack[schemasStack.length - 1] : null*!/;
            // schemas: ['xxx', 'xxx']
            let schemas = schemaFrom[keyword];
            if (schemas !== undefined) {
              const isArray = Array.isArray(schemas);
              if (key.isArray && !isArray) throw new TypeError('scheme error, keyword\'s value must be a array');
              if (!isArray) schemas = [schemas];
              // tags: 插入新模型
              schemasStack.push({keyword, schemas, schemaFrom, keyPath, upStackItem, errors, state: 0, dataNum: 0, dataIndex: dataStack.length});
            }
          }
        }
      }
      if (schemasStack.length > schemaLen) {
        const {data} = props;
        dataStack.push({dataName: '', data, dataFrom: null, dataPath: ''});
      }
    }
  }
};*/

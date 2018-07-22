const keys = require('./keys');

/**
 * 遍历属性中的所有KEY并转入栈中，待进一步处理..
 * @param props {Object}
 * {
 *  stack: {}, 栈
 *  parent: {}, 指向上级有关栈元素
 *  schemaFrom: {}, 模型
 *  errorItems: [], 错误
 *  data: {}, 数据
 *  dataFrom: {}, 数据来源
 *  dataName: '', 数据来源属性名称
 *  dataIndex: '', 数据来源索引值
 * }
 *
 // 栈结构: keyword, schema, schemaFrom, schemaPath, parent, children, errorItems, state, dataIndex
 // 数据栈结构: dataName, data, dataFrom, dataPath
 */
const schemaProperties = function (props) {
  const {stack, parent = null, dataFrom = null, dataName, dataIndex} = props;
  let {schemaFrom, data} = props, doIt = false;
  if (schemaFrom) {
    const isArr = (Array.isArray(schemaFrom) && schemaFrom.length > 0), isObj = schemaFrom.constructor === Object;
    if (isArr || isObj) {
      let schemaPath, dataPath, upSchemaPath, upDataPath;
      if (parent) {
        upSchemaPath = parent.schemaPath;
        upDataPath = parent.dataPath;
      } else {
        upSchemaPath = '';
        upDataPath = '';
      }
      if (data !== undefined) {
        schemaPath = upSchemaPath + (dataName !== undefined ? '/' + dataName : dataIndex !== undefined ? '/' + dataIndex : '');
        dataPath = upSchemaPath + (dataName !== undefined ? '.' + dataName : dataIndex !== undefined ? '[' + dataIndex + ']' : '');
      } else {
        schemaPath = upSchemaPath;
        dataPath = upDataPath;
        data = parent.data;
      }
      const schemaLen = stack.length;
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
              const stkItem = {
                keyword, schema, rawSchema, schemaFrom: schFrom, schemaPath, parent, children: [], errorItems: [], state: 0,
                data, dataFrom, dataName, dataIndex, dataPath
              };
              if (isArr) stkItem.schemaFromIndex = i;
              if (parent) parent.children.push(stkItem);
              stack.push(stkItem);
            }
          }
        }
      }
      if (stack.length > schemaLen) {
        doIt = true;
      }
    }
  }
  return doIt;
};
const Z_ANCHOR = /[^\\]\\Z/;
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
  regexp: function (data) {
    if (typeof data === 'string') {
      if (Z_ANCHOR.test(data)) return false;
      try {
        new RegExp(data);
        return true;
      } catch (e) {
        return false;
      }
    } else {
      return data.constructor === RegExp;
    }
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
 * @param stackItem {Object}, 要验证的栈片，不传时默认为栈的栈顶
 */
const validateSchema = function (stackItem) {
  const {keyword, schema, schemaPath} = stackItem, {schema: optSchema} = keys.regKeywords[keyword].option, {valid} = optSchema;
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
      if (!isValid) throw new TypeError('scheme error, keyword\'s values invalid at "' + schemaPath + keyword + '" by types');
    }
    if (value && !value(schema)) throw new TypeError('scheme error, keyword\'s value invalid at "' + schemaPath + '/' + keyword + '" by value');
  }
};
/**
 * 验证数据对象
 * @param data {Object|Array}
 * @return {Boolean}
 */
const validate = function (data) {
  this.data = data;
  const errorItems = this.errorItems = [], stack = [], schemas = this.schemas;
  schemaProperties({stack, schemaFrom: schemas, data, dataFrom: null});
  while (stack.length > 0) {
    const stackItem = stack[stack.length - 1], {keyword} = stackItem, option = keys.regKeywords[keyword].option;
    let {state} = stackItem, pop = false;
    if (!(state < 0)) {
      const {data} = option, {valid: dataValid} = data;
      if (state === 0) validateSchema(stackItem);
      if (dataValid) {
        dataValid(stack);
        state = stackItem.state;
        if (state < 0) pop = true;
      } else pop = true;
    } else pop = true;
    if (pop) {
      const {parent, errorItems: stackErrorItems} = stackItem;
      if (state === -1 && stackErrorItems.length > 0) {
        const to = parent ? parent.errorItems : errorItems;
        for (const errorItem of stackErrorItems) {
          to.push(errorItem);
        }
      }
      stack.pop();
    }
  }
  if (errorItems.length > 0) {
    for (const stackItem of errorItems) {
      const {keyword} = stackItem, option = keys.regKeywords[keyword].option, {data} = option, {error} = data;
      if (error) error(stackItem, option);
    }
    return false;
  }
  return true;
};
module.exports = {validate, schemaProperties};

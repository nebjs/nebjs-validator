const types = {
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
 * type关键字处理程序：data值的类型是否在指定的schemas中
 * 举例：type: ['string', 'number']
 * 符合：data: 1, 100, 'a', 'abc'
 * 不符合: data: {}, null
 */
const dataValid = function (stack) {
  const stackItem = stack[stack.length - 1], {data, schema} = stackItem;
  let valid = false;
  for (const val of schema) {
    const type = types[val];
    if (type) {
      if (typeof type === 'string') {
        valid = typeof data === type;
      } else if (typeof type === 'function') {
        valid = type(data);
      }
      if (valid) break;
    }
  }
  if (!valid) {
    const {dataPath} = stackItem;
    stackItem.params = {type: schema};
    stackItem.message = 'data' + dataPath + ' should be ' + schema.toString();
    stackItem.errorItems.push(stackItem);
  }
  stackItem.state = -1;
};
const type = [
  {name: 'type', schema: {array: true, valid: {types: ['string']}}, data: {valid: dataValid}, ext: {types}}
];
module.exports = type;

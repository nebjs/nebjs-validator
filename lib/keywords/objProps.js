/**
 * maxProperties关键字处理程序：data对象属性数量最大值
 * 举例：maxProperties: 2
 * 符合：data: [{}, {"a": 1}, {"a": 1, "b": 2}]
 * 不符合: data: [{"a": 1, "b": 2, "c": 3}]
 * @param schemasStack 模型栈
 * @param dataStack 数据栈
 */
const maxPropertiesDataValid = function (schemasStack, dataStack) {
  const schemaStackItem = schemasStack[schemasStack.length - 1], dataStackItem = dataStack[schemaStackItem.dataIndex];
  const {data} = dataStackItem, {schema} = schemaStackItem;
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    let len = 0, err = false, min = schema;
    for (const n in data) {
      if (data.hasOwnProperty(n)) {
        len++;
        if (len > min) {
          err = true;
          break;
        }
      }
    }
    if (err) {
      schemaStackItem.errors.push(schemaStackItem);
    }
  }
  schemaStackItem.state = -1;
};
/**
 * minProperties关键字处理程序：data字符串长度最大值
 * 举例：minProperties: 2
 * 符合：data: [{"a": 1, "b": 2}, {"a": 1, "b": 2, "c": 3}]
 * 不符合: data: [{}, {"a": 1}]
 * @param schemasStack 模型栈
 * @param dataStack 数据栈
 */
const minPropertiesDataValid = function (schemasStack, dataStack) {
  const schemaStackItem = schemasStack[schemasStack.length - 1], dataStackItem = dataStack[schemaStackItem.dataIndex];
  const {data} = dataStackItem, {schema} = schemaStackItem;
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    let len = 0;
    for (const n in data) {
      if (data.hasOwnProperty(n)) {
        len++;
      }
    }
    if (len < schema) {
      schemaStackItem.errors.push(schemaStackItem);
    }
  }
  schemaStackItem.state = -1;
};
const valid = function (val) {
  return val >= 0 && val % 1 === 0;
};
const strLength = [
  {name: 'maxProperties', schema: {valid: {types: ['number'], value: valid}}, data: {valid: maxPropertiesDataValid}},
  {name: 'minProperties', schema: {valid: {types: ['number'], value: valid}}, data: {valid: minPropertiesDataValid}}
];
module.exports = strLength;

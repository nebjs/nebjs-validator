/**
 * maxLength关键字处理程序：data字符串长度最大值
 * 举例：maxLength: 5
 * 符合：data: ["abc", "abcd", "abcde"]
 * 不符合: data: ["abcdef"]
 * @param schemasStack 模型栈
 * @param dataStack 数据栈
 */
const maxLengthDataValid = function (schemasStack, dataStack) {
  const schemaStackItem = schemasStack[schemasStack.length - 1], dataStackItem = dataStack[schemaStackItem.dataIndex];
  const {data} = dataStackItem, {schemas} = schemaStackItem;
  if (typeof data === 'string') {
    if (data.length > schemas[0]) {
      schemaStackItem.errors.push(schemaStackItem);
    }
  }
  schemaStackItem.state = -1;
};
/**
 * minLength关键字处理程序：data字符串长度最大值
 * 举例：minLength: 3
 * 符合：data: ["abc", "abcd", "abcde"]
 * 不符合: data: ["ab", "a"]
 * @param schemasStack 模型栈
 * @param dataStack 数据栈
 */
const minLengthDataValid = function (schemasStack, dataStack) {
  const schemaStackItem = schemasStack[schemasStack.length - 1], dataStackItem = dataStack[schemaStackItem.dataIndex];
  const {data} = dataStackItem, {schemas} = schemaStackItem;
  if (typeof data === 'string') {
    if (data.length < schemas[0]) {
      schemaStackItem.errors.push(schemaStackItem);
    }
  }
  schemaStackItem.state = -1;
};
const valid = function (schemasStack, val/*, i*/) {
  return val >= 0 && val % 1 === 0;
};
const strLength = [
  {name: 'maxLength', schema: {only: true, valid: {types: ['number'], value: valid}}, data: {valid: maxLengthDataValid}},
  {name: 'minLength', schema: {only: true, valid: {types: ['number'], value: valid}}, data: {valid: minLengthDataValid}}];
module.exports = strLength;

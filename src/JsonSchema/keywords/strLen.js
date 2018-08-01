/**
 * maxLength关键字处理程序：data字符串长度最大值
 * 举例：maxLength: 5
 * 符合：data: ["abc", "abcd", "abcde"]
 * 不符合: data: ["abcdef"]
 */
const maxLengthDataValid = function (stack) {
  const stackItem = stack[stack.length - 1], {data, schema} = stackItem;
  if (typeof data === 'string') {
    if (data.length > schema) {
      const {dataPath} = stackItem, maxLength = schema;
      stackItem.params = {maxLength};
      stackItem.message = 'data' + dataPath + ' NOT be longer than ' + maxLength + ' characters';
      stackItem.errorItems.push(stackItem);
    }
  }
  stackItem.state = -1;
};
/**
 * minLength关键字处理程序：data字符串长度最大值
 * 举例：minLength: 3
 * 符合：data: ["abc", "abcd", "abcde"]
 * 不符合: data: ["ab", "a"]
 */
const minLengthDataValid = function (stack) {
  const stackItem = stack[stack.length - 1], {data, schema} = stackItem;
  if (typeof data === 'string') {
    if (data.length < schema) {
      const {dataPath} = stackItem, minLength = schema;
      stackItem.params = {minLength};
      stackItem.message = 'data' + dataPath + ' NOT be shorter than ' + minLength + ' characters';
      stackItem.errorItems.push(stackItem);
    }
  }
  stackItem.state = -1;
};
const valid = function (val) {
  return val >= 0 && val % 1 === 0;
};
const strLen = [
  {name: 'maxLength', schema: {valid: {types: ['number'], value: valid}}, data: {valid: maxLengthDataValid}},
  {name: 'minLength', schema: {valid: {types: ['number'], value: valid}}, data: {valid: minLengthDataValid}}
];
module.exports = strLen;

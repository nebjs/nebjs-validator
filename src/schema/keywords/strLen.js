const maxLengthMessage = 'data{{dataPath}} not be longer than {{params.maxLength}} character';
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
      stackItem.params = {maxLength: schema};
      stackItem.errorItems.push(stackItem);
    }
  }
  stackItem.state = -1;
};
const minLengthMessage = 'data{{dataPath}} not be shorter than {{params.minLength}} character';
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
      stackItem.params = {minLength: schema};
      stackItem.errorItems.push(stackItem);
    }
  }
  stackItem.state = -1;
};
const valid = function (val) {
  return val >= 0 && val % 1 === 0;
};
const strLen = [
  {name: 'maxLength', schema: {valid: {types: ['number'], value: valid}}, data: {valid: maxLengthDataValid}, ext: {message: maxLengthMessage}},
  {name: 'minLength', schema: {valid: {types: ['number'], value: valid}}, data: {valid: minLengthDataValid}, ext: {message: minLengthMessage}}
];
module.exports = strLen;

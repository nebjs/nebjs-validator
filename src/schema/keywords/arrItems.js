const maxItemsMessage = 'data{{dataPath}} should not have more than {{params.maxItems}} item';
/**
 * maxItems关键字处理程序：data数组元素个数最大值
 * 举例：maxItems: 3
 * 符合：data: [[], [1], [1, 2, 3]]
 * 不符合: data: [[1, 2, 3, 4]]
 */
const maxItemsDataValid = function (stack) {
  const stackItem = stack[stack.length - 1], {schema, data} = stackItem;
  if (Array.isArray(data) && data.length > schema) {
    stackItem.params = {maxItems: schema};
    stackItem.errorItems.push(stackItem);
  }
  stackItem.state = -1;
};
const minItemsMessage = 'data{{dataPath}} should not have less than {{params.minItems}} item';
/**
 * minItems关键字处理程序：data数组元素个数最大值
 * 举例：minItems: 3
 * 符合：data: [[1, 2, 3, 4], [1, 2, 3]]
 * 不符合: data: [[], [1]]
 */
const minItemsDataValid = function (stack) {
  const stackItem = stack[stack.length - 1], {schema, data} = stackItem;
  if (Array.isArray(data) && data.length < schema) {
    stackItem.params = {minItems: schema};
    stackItem.errorItems.push(stackItem);
  }
  stackItem.state = -1;
};
/**
 * 关键字对应模型值验证程序
 * @param val
 * @returns {boolean}
 */
const schemaValueValid = function (val) {
  return val >= 0 && val % 1 === 0;
};
const strLength = [
  {name: 'maxItems', schema: {valid: {types: ['number'], value: schemaValueValid}}, data: {valid: maxItemsDataValid}, ext: {message: maxItemsMessage}},
  {name: 'minItems', schema: {valid: {types: ['number'], value: schemaValueValid}}, data: {valid: minItemsDataValid}, ext: {message: minItemsMessage}}
];
module.exports = strLength;

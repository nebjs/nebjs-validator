/**
 * maxItems关键字处理程序：data数组元素个数最大值
 * 举例：maxItems: 3
 * 符合：data: [[], [1], [1, 2, 3]]
 * 不符合: data: [[1, 2, 3, 4]]
 * @param stack 栈
 */
const maxItemsDataValid = function (stack) {
  const stackItem = stack[stack.length - 1], {schema, data} = stackItem;
  if (Array.isArray(data) && data.length > schema) {
    stackItem.errorItems.push(stackItem);
  }
  stackItem.state = -1;
};
/**
 * minItems关键字处理程序：data数组元素个数最大值
 * 举例：minItems: 3
 * 符合：data: [[1, 2, 3, 4], [1, 2, 3]]
 * 不符合: data: [[], [1]]
 * @param stack 栈
 */
const minItemsDataValid = function (stack) {
  const stackItem = stack[stack.length - 1], {schema, data} = stackItem;
  if (Array.isArray(data) && data.length < schema) {
    stackItem.errorItems.push(stackItem);
  }
  stackItem.state = -1;
};
const valid = function (val) {
  return val >= 0 && val % 1 === 0;
};
const strLength = [
  {name: 'maxItems', schema: {valid: {types: ['number'], value: valid}}, data: {valid: maxItemsDataValid}},
  {name: 'minItems', schema: {valid: {types: ['number'], value: valid}}, data: {valid: minItemsDataValid}}
];
module.exports = strLength;

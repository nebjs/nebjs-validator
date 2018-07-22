/**
 * maxItems关键字处理程序：data数组元素个数最大值
 * 举例：maxItems: 3
 * 符合：data: [[], [1], [1, 2, 3]]
 * 不符合: data: [[1, 2, 3, 4]]
 */
const maxItemsDataValid = function (stack) {
  const stackItem = stack[stack.length - 1], {schema, data} = stackItem;
  if (Array.isArray(data) && data.length > schema) {
    const {dataPath} = stackItem, maxItems = schema;
    stackItem.params = {maxItems};
    stackItem.message = 'data' + dataPath + ' should NOT have less than ' + maxItems + ' items';
    stackItem.errorItems.push(stackItem);
  }
  stackItem.state = -1;
};
/**
 * minItems关键字处理程序：data数组元素个数最大值
 * 举例：minItems: 3
 * 符合：data: [[1, 2, 3, 4], [1, 2, 3]]
 * 不符合: data: [[], [1]]
 */
const minItemsDataValid = function (stack) {
  const stackItem = stack[stack.length - 1], {schema, data} = stackItem;
  if (Array.isArray(data) && data.length < schema) {
    const {dataPath} = stackItem, minItems = schema;
    stackItem.params = {minItems};
    stackItem.message = 'data' + dataPath + ' should NOT have less than ' + minItems + ' items';
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
  {name: 'maxItems', schema: {valid: {types: ['number'], value: schemaValueValid}}, data: {valid: maxItemsDataValid}},
  {name: 'minItems', schema: {valid: {types: ['number'], value: schemaValueValid}}, data: {valid: minItemsDataValid}}
];
module.exports = strLength;

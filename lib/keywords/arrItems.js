/**
 * maxItems关键字处理程序：data数组元素个数最大值
 * 举例：maxItems: 3
 * 符合：data: [[], [1], [1, 2, 3]]
 * 不符合: data: [[1, 2, 3, 4]]
 * @param schemasStack 模型栈
 * @param dataStack 数据栈
 */
const maxItemsDataValid = function (schemasStack, dataStack) {
  const schemaStackItem = schemasStack[schemasStack.length - 1], dataStackItem = dataStack[schemaStackItem.dataIndex];
  const {data} = dataStackItem, {schemas} = schemaStackItem;
  if (Array.isArray(data)) {
    if (data.length > schemas[0]) {
      schemaStackItem.errors.push(schemaStackItem);
    }
  }
  schemaStackItem.state = -1;
};
/**
 * minItems关键字处理程序：data数组元素个数最大值
 * 举例：minItems: 3
 * 符合：data: [[1, 2, 3, 4], [1, 2, 3]]
 * 不符合: data: [[], [1]]
 * @param schemasStack 模型栈
 * @param dataStack 数据栈
 */
const minItemsDataValid = function (schemasStack, dataStack) {
  const schemaStackItem = schemasStack[schemasStack.length - 1], dataStackItem = dataStack[schemaStackItem.dataIndex];
  const {data} = dataStackItem, {schemas} = schemaStackItem;
  if (Array.isArray(data)) {
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
  {name: 'maxItems', schema: {only: true, valid: {types: ['number'], value: valid}}, data: {valid: maxItemsDataValid}},
  {name: 'minItems', schema: {only: true, valid: {types: ['number'], value: valid}}, data: {valid: minItemsDataValid}}];
module.exports = strLength;

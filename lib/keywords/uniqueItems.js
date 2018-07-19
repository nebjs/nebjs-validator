const nebUtil = require('nebjs-util');
const uniqueItem = nebUtil.array.uniqueItem;
/**
 * uniqueItems关键字处理程序：data数组无重复元素
 * 举例：uniqueItems: true
 * 符合：data: [[], [1, 2, 3], [1, "a"]]
 * 不符合: data: [[1, 1, 2], [1, {"a": "b", "b": "c"}, {"b": "c", "a": "b"}]
 * @param schemasStack 模型栈
 * @param dataStack 数据栈
 */
const uniqueItemsDataValid = function (schemasStack, dataStack) {
  const schemaStackItem = schemasStack[schemasStack.length - 1], dataStackItem = dataStack[schemaStackItem.dataIndex];
  const {data} = dataStackItem, {schemas} = schemaStackItem;
  if (Array.isArray(data) && schemas[0]) {
    if (!uniqueItem(data)) {
      schemaStackItem.errors.push(schemaStackItem);
    }
  }
  schemaStackItem.state = -1;
};
const strLength = [
  {name: 'uniqueItems', schema: {only: true, valid: {types: ['boolean']}}, data: {valid: uniqueItemsDataValid}}];
module.exports = strLength;

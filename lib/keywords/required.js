/**
 * required关键字处理程序：data中是否有相应的属性...
 * 举例：required: ["a", "b"]
 * 符合：data: [{"a": 1, "b": 2}, {"a": 1, "b": 2, "c": 3}]
 * 不符合: data: [{}, {"a": 1}, {"c": 3, "d":4}]
 * @param schemasStack 模型栈
 * @param dataStack 数据栈
 */
const dataValid = function (schemasStack, dataStack) {
  const schemaStackItem = schemasStack[schemasStack.length - 1], dataStackItem = dataStack[schemaStackItem.dataIndex];
  const {data} = dataStackItem, {schema} = schemaStackItem;
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    for (const val of schema) {
      if (!data.hasOwnProperty(val)) {
        schemaStackItem.errors.push(schemaStackItem);
        break;
      }
    }
  }
  schemaStackItem.state = -1;
};
const required = [
  {name: 'required', schema: {array: true, valid: {types: ['string']}}, data: {valid: dataValid}}
];
module.exports = required;

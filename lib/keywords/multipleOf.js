/**
 * multipleOf关键字处理程序：data值的是否是schema的倍数
 * 举例：multipleOf: 1.5
 * 符合：data: [1.5, 3, 6]
 * 不符合: [1, 2, 3, 4]
 * @param schemasStack 模型栈
 * @param dataStack 数据栈
 */
const dataValid = function (schemasStack, dataStack) {
  const schemaStackItem = schemasStack[schemasStack.length - 1], dataStackItem = dataStack[schemaStackItem.dataIndex];
  const {data} = dataStackItem, {schemas} = schemaStackItem;
  if (typeof data === 'number') {
    if (data % schemas[0] !== 0) {
      schemaStackItem.errors.push(schemaStackItem);
    }
  }
  schemaStackItem.state = -1;
};
const multipleOf = [{
  name: 'multipleOf', schema: {
    only: true, valid: {
      types: ['number'], value(schemasStack, val/*, i*/) {
        return val > 0;
      }
    }
  }, data: {valid: dataValid}
}];
module.exports = multipleOf;

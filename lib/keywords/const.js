const nebUtil = require('nebjs-util');
const equal = nebUtil.common.equal;
/**
 * const关键字处理程序：data值的是否等于schema
 * 举例：const: [1, 2, 3]
 * 符合：data: [1, 2, 3]
 * 不符合: [1, 2, 3, 4]
 * @param schemasStack 模型栈
 * @param dataStack 数据栈
 */
const dataValid = function (schemasStack, dataStack) {
  const schemaStackItem = schemasStack[schemasStack.length - 1], dataStackItem = dataStack[schemaStackItem.dataIndex];
  const {data} = dataStackItem, {schemas} = schemaStackItem;
  if (!equal(schemas[0], data)) {
    schemaStackItem.errors.push(schemaStackItem);
  }
  schemaStackItem.state = -1;
};
const consts = [{name: 'const', schema: {only: true}, data: {valid: dataValid}}];
module.exports = consts;

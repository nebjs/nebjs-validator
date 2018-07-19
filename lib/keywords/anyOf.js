const {schemaProperties} = require('../common');
/**
 * anyOf关键字处理程序：data对象的多个组合验证结果中有一个成功，则成功（先检测到一个成功，则后续不再执行）...
 * 举例：anyOf: [{"maximum": 3}, {"type": "integer"}]
 * 符合：data: [1.5, 2, 2.5, 3, 4, 5, any non-number]
 * 不符合：data: [4.5, 5.5]
 * @param schemasStack 模型栈
 * @param dataStack 数据栈
 */
const dataValid = function (schemasStack, dataStack) {
  // 检测到任何错误即结束
  const schemaStackItem = schemasStack[schemasStack.length - 1]/*, dataStackItem = dataStack[schemaStackItem.dataIndex]*/;
  const {state, runSchemaIndex, schemas} = schemaStackItem;
  switch (state) {
    case 0:
      if (schemas.length === 0) {
        schemaStackItem.state = -1;
      } else {
        schemaStackItem.runSchemaIndex = 0;
        schemaStackItem.state++;
      }
      break;
    case 1:
      schemaProperties({schemasStack, dataStack, schemasFrom: schemas[runSchemaIndex], upStackItem: schemaStackItem});
      schemaStackItem.runSchemaIndex++;
      schemaStackItem.state++;
      break;
    case 2:
      if (schemaStackItem.errors.length === 0) {
        schemaStackItem.state = -1;
      } else if (runSchemaIndex === schemas.length) {
        schemaStackItem.errors = [Object.assign({}, schemaStackItem)];
        schemaStackItem.state = -1;
      } else {
        schemaStackItem.errors = [];
        schemaStackItem.state--;
      }
      break;
  }
};
const properties = [
  {name: 'anyOf', schema: {valid: {types: ['object']}}, data: {valid: dataValid}},];
module.exports = properties;

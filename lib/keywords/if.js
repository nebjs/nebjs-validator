let lastIfSchemaStackItem, isErrors;
const {schemaProperties} = require('../common');
/**
 * else关键字处理程序：data对象的条件验证...
 * 举例：if: {}, then: {}, else: {}
 * @param schemasStack 模型栈
 * @param dataStack 数据栈
 */
const elseDataValid = function (schemasStack, dataStack) {
  const schemaStackItem = schemasStack[schemasStack.length - 1];
  const {state} = schemaStackItem;
  switch (state) {
    case 0:
      if (lastIfSchemaStackItem && lastIfSchemaStackItem.upStackItem === schemaStackItem.upStackItem && isErrors) {
        schemaProperties({schemasStack, dataStack, schemaFrom: schemaStackItem.schema, upStackItem: schemaStackItem});
        schemaStackItem.state++;
      } else {
        schemaStackItem.state = -1;
      }
      break;
    case 1:
      schemaStackItem.state = -1;
      break;
  }
};
/**
 * then关键字处理程序：data对象的条件验证...
 * 举例：if: {}, then: {}, else: {}
 * @param schemasStack 模型栈
 * @param dataStack 数据栈
 */
const thenDataValid = function (schemasStack, dataStack) {
  const schemaStackItem = schemasStack[schemasStack.length - 1];
  const {state} = schemaStackItem;
  switch (state) {
    case 0:
      if (lastIfSchemaStackItem && lastIfSchemaStackItem.upStackItem === schemaStackItem.upStackItem && !isErrors) {
        schemaProperties({schemasStack, dataStack, schemaFrom: schemaStackItem.schema, upStackItem: schemaStackItem});
        schemaStackItem.state++;
      } else {
        schemaStackItem.state = -1;
      }
      break;
    case 1:
      schemaStackItem.state = -1;
      break;
  }
};
/**
 * if关键字处理程序：data对象的条件验证...
 * 举例：if: {}, then: {}, else: {}
 * @param schemasStack 模型栈
 * @param dataStack 数据栈
 */
const ifDataValid = function (schemasStack, dataStack) {
  const schemaStackItem = schemasStack[schemasStack.length - 1]/*, dataStackItem = dataStack[schemaStackItem.dataIndex]*/;
  const {state} = schemaStackItem;
  switch (state) {
    case 0:
      schemaProperties({schemasStack, dataStack, schemaFrom: schemaStackItem.schema, upStackItem: schemaStackItem});
      schemaStackItem.state++;
      break;
    case 1:
      lastIfSchemaStackItem = schemaStackItem;
      isErrors = schemaStackItem.errors.length > 0;
      schemaStackItem.state = -2;
      break;
  }
};
const properties = [
  {name: 'else', schema: {only: true, valid: {types: ['object']}}, data: {valid: elseDataValid}},
  {name: 'then', schema: {only: true, valid: {types: ['object']}}, data: {valid: thenDataValid}},
  {name: 'if', schema: {only: true, valid: {types: ['object']}}, data: {valid: ifDataValid}}
];
module.exports = properties;

let lastIfstackItem, isErrors;
const {schemaProperties} = require('../../core/common');
/**
 * else关键字处理程序：data对象的条件验证...
 * 举例：if: {}, then: {}, else: {}
 */
const elseDataValid = function (stack) {
  const stackItem = stack[stack.length - 1], {state} = stackItem;
  switch (state) {
    case 0:
      if (lastIfstackItem && lastIfstackItem.parent === stackItem.parent && isErrors) {
        schemaProperties(this.context, {stack, schemaFrom: stackItem.schema, parent: stackItem});
        stackItem.state++;
      } else {
        stackItem.state = -1;
      }
      break;
    case 1:
      stackItem.state = -1;
      break;
  }
};
/**
 * then关键字处理程序：data对象的条件验证...
 * 举例：if: {}, then: {}, else: {}
 */
const thenDataValid = function (stack) {
  const stackItem = stack[stack.length - 1], {state} = stackItem;
  switch (state) {
    case 0:
      if (lastIfstackItem && lastIfstackItem.parent === stackItem.parent && !isErrors) {
        schemaProperties(this.context, {stack, schemaFrom: stackItem.schema, parent: stackItem});
        stackItem.state++;
      } else {
        stackItem.state = -1;
      }
      break;
    case 1:
      stackItem.state = -1;
      break;
  }
};
/**
 * if关键字处理程序：data对象的条件验证...
 * 举例：if: {}, then: {}, else: {}
 */
const ifDataValid = function (stack) {
  const stackItem = stack[stack.length - 1], {state} = stackItem;
  switch (state) {
    case 0:
      schemaProperties(this.context, {stack, schemaFrom: stackItem.schema, parent: stackItem});
      stackItem.state++;
      break;
    case 1:
      lastIfstackItem = stackItem;
      isErrors = stackItem.errorItems.length > 0;
      stackItem.state = -2;
      break;
  }
};
const properties = [
  {name: 'else', schema: {only: true, valid: {types: ['object']}}, data: {valid: elseDataValid}},
  {name: 'then', schema: {only: true, valid: {types: ['object']}}, data: {valid: thenDataValid}},
  {name: 'if', schema: {only: true, valid: {types: ['object']}}, data: {valid: ifDataValid}}
];
module.exports = properties;

const {schemaProperties} = require('../../core/common');
const message = 'data{{dataPath}} should not be valid';
/**
 * not关键字处理程序：data对象的验证结果反转...
 * 举例：not: xxx
 */
const dataValid = function (stack) {
  const stackItem = stack[stack.length - 1], {state} = stackItem;
  switch (state) {
    case 0:
      schemaProperties(this.context, {stack, schemaFrom: stackItem.schema, parent: stackItem});
      stackItem.state++;
      break;
    case 1:
      if (stackItem.errorItems.length > 0) {
        stackItem.state = -2;
      } else {
        stackItem.errorItems.push(stackItem);
        stackItem.state = -1;
      }
      break;
  }
};
const properties = [
  {name: 'not', schema: {array: true, valid: {types: ['object']}}, data: {valid: dataValid}, ext: {message}}
];
module.exports = properties;

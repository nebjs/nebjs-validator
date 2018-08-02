const {schemaProperties} = require('../../core/common');
const message = 'data{{dataPath}} should match some schema in anyOf';
/**
 * anyOf关键字处理程序：data对象的多个组合验证结果中有一个成功，则成功（先检测到一个成功，则后续不再执行）...
 * 举例：anyOf: [{"maximum": 3}, {"type": "integer"}]
 * 符合：data: [1.5, 2, 2.5, 3, 4, 5, any non-number]
 * 不符合：data: [4.5, 5.5]
 */
const dataValid = function (stack) {
  // 检测到任何错误即结束
  const stackItem = stack[stack.length - 1], {state, runSchemaIndex, schema} = stackItem;
  switch (state) {
    case 0:
      if (schema.length === 0) {
        stackItem.state = -1;
      } else {
        stackItem.runSchemaIndex = 0;
        stackItem.state++;
      }
      break;
    case 1:
      schemaProperties(this.context, {stack, schemaFrom: schema[runSchemaIndex], parent: stackItem});
      stackItem.runSchemaIndex++;
      stackItem.state++;
      break;
    case 2:
      if (stackItem.errorItems.length === 0) {
        stackItem.state = -1;
      } else if (runSchemaIndex === schema.length) {
        stackItem.errorItems.push(stackItem);
        stackItem.state = -1;
      } else {
        stackItem.errorItems = [];
        stackItem.state--;
      }
      break;
  }
};
const properties = [
  {name: 'anyOf', schema: {array: true, valid: {types: ['object']}}, data: {valid: dataValid}, ext: {message}}
];
module.exports = properties;

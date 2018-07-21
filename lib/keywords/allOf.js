const {schemaProperties} = require('../base/common');
/**
 * allOf关键字处理程序：data对象的多个组合验证结果全部成功，则成功（所有组合都会执行）...
 * 举例：allOf: [{"maximum": 3}, {"type": "integer"}]
 * 符合：data: [2, 3]
 * 不符合：data: [1.5, 2.5, 4, 4.5, 5, 5.5, any non-number]
 * @param stack 栈
 */
const dataValid = function (stack) {
  // 方案一：全部检测完再判断
  const stackItem = stack[stack.length - 1], {state, runSchemaIndex, schema} = stackItem;
  switch (state) {
    case 0:
      if (schema.length === 0) {
        stackItem.state = -1;
      } else {
        stackItem.runSchemaIndex = 0;
        stackItem.runSchemaErrors = [];
        stackItem.state++;
      }
      break;
    case 1:
      schemaProperties({stack, schemaFrom: schema[runSchemaIndex], parent: stackItem});
      stackItem.runSchemaIndex++;
      stackItem.state++;
      break;
    case 2:
      stackItem.runSchemaErrors.push(stackItem.errorItems);
      stackItem.errorItems = [];
      if (runSchemaIndex < schema.length) {
        stackItem.state--;
      } else {
        let haveErr = false;
        const schemaErrors = stackItem.runSchemaErrors;
        for (const errorItems of schemaErrors) {
          if (errorItems.length > 0) {
            haveErr = true;
            break;
          }
        }
        if (haveErr) {
          stackItem.errorItems.push(stackItem);
          stackItem.state = -1;
        } else {
          stackItem.state = -2;// 置状态小于0，代表已经完成所有的过程，等于-1时处理错误信息，等于-2不处理错误信息
        }
      }
      break;
  }
  // 方案二：检测到错误即结束
  /*const stackItem = stack[stack.length - 1];
  const {state, runSchemaIndex, schema} = stackItem;
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
      schemaProperties({stack, schemaFrom: schema[runSchemaIndex], parent: stackItem});
      stackItem.runSchemaIndex++;
      stackItem.state++;
      break;
    case 2:
      if (stackItem.errorItems.length > 0) {
        stackItem.errorItems = [Object.assign({}, stackItem)];
        stackItem.state = -1;
      } else if (runSchemaIndex === schema.length) {
        stackItem.state = -1;
      } else {
        stackItem.state--;
      }
      break;
  }*/
};
const properties = [
  {name: 'allOf', schema: {array: true, valid: {types: ['object']}}, data: {valid: dataValid}}
];
module.exports = properties;

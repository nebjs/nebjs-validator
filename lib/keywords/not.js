const {schemaProperties} = require('../base/common');
/**
 * not关键字处理程序：data对象的验证结果反转...
 * 举例：not: xxx
 * @param stack 栈
 */
const dataValid = function (stack) {
  const stackItem = stack[stack.length - 1], {state} = stackItem;
  switch (state) {
    case 0:
      // 加入not信息
      schemaProperties({stack, schemaFrom: stackItem.schema, parent: stackItem});
      stackItem.state++;
      break;
    case 1:
      // 判断not结果
      if (stackItem.errorItems.length > 0) {
        // 如果有错，删除错误
        // stackItem.errorItems.splice(0, stackItem.errorItems.length);
        stackItem.state = -2;// 置状态小于0，代表已经完成所有的过程
      } else {
        // 如果无错，添加错误...
        stackItem.errorItems.push(stackItem);
        stackItem.state = -1;// 置状态小于0，代表已经完成所有的过程
      }
      break;
  }
};
const properties = [
  {name: 'not', schema: {array: true, valid: {types: ['object']}}, data: {valid: dataValid}}
];
module.exports = properties;

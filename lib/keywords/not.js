const {schemaProperties} = require('../common');
/**
 * not关键字处理程序：data对象的验证结果反转...
 * 举例：not: xxx
 * @param schemasStack 模型栈
 * @param dataStack 数据栈
 */
const dataValid = function (schemasStack, dataStack) {
  const schemaStackItem = schemasStack[schemasStack.length - 1]/*, dataStackItem = dataStack[schemaStackItem.dataIndex]*/;
  const {state} = schemaStackItem;
  switch (state) {
    case 0:
      // 加入not信息
      schemaProperties({schemasStack, dataStack, schemaFrom: schemaStackItem.schema, upStackItem: schemaStackItem});
      schemaStackItem.state++;
      break;
    case 1:
      // 判断not结果
      if (schemaStackItem.errors.length > 0) {
        // 如果有错，删除错误
        // schemaStackItem.errors.splice(0, schemaStackItem.errors.length);
        schemaStackItem.state = -2;// 置状态小于0，代表已经完成所有的过程
      } else {
        // 如果无错，添加错误...
        schemaStackItem.errors.push(schemaStackItem);
        schemaStackItem.state = -1;// 置状态小于0，代表已经完成所有的过程
      }
      break;
  }
};
const properties = [
  {name: 'not', schema: {array: true, valid: {types: ['object']}}, data: {valid: dataValid}}
];
module.exports = properties;

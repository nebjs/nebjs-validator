const {schemaProperties} = require('../common');
/**
 * allOf关键字处理程序：data对象的多个组合验证结果全部成功，则成功（所有组合都会执行）...
 * 举例：allOf: [{"maximum": 3}, {"type": "integer"}]
 * 符合：data: [2, 3]
 * 不符合：data: [1.5, 2.5, 4, 4.5, 5, 5.5, any non-number]
 * @param schemasStack 模型栈
 * @param dataStack 数据栈
 */
const dataValid = function (schemasStack, dataStack) {
  // 方案一：全部检测完再判断
  const schemaStackItem = schemasStack[schemasStack.length - 1]/*, dataStackItem = dataStack[schemaStackItem.dataIndex]*/;
  const {state, runSchemaIndex, schema} = schemaStackItem;
  switch (state) {
    case 0:
      if (schema.length === 0) {
        schemaStackItem.state = -1;
      } else {
        schemaStackItem.runSchemaIndex = 0;
        schemaStackItem.runSchemaErrors = [];
        schemaStackItem.state++;
      }
      break;
    case 1:
      schemaProperties({schemasStack, dataStack, schemaFrom: schema[runSchemaIndex], upStackItem: schemaStackItem});
      schemaStackItem.runSchemaIndex++;
      schemaStackItem.state++;
      break;
    case 2:
      schemaStackItem.runSchemaErrors.push(schemaStackItem.errors);
      schemaStackItem.errors = [];
      if (runSchemaIndex < schema.length) {
        schemaStackItem.state--;
      } else {
        let haveErr = false;
        const schemaErrors = schemaStackItem.runSchemaErrors;
        for (const errors of schemaErrors) {
          if (errors.length > 0) {
            haveErr = true;
            break;
          }
        }
        if (haveErr) {
          schemaStackItem.errors.push(schemaStackItem);
          schemaStackItem.state = -1;
        } else {
          schemaStackItem.state = -2;// 置状态小于0，代表已经完成所有的过程，等于-1时处理错误信息，等于-2不处理错误信息
        }
      }
      break;
  }
  // 方案二：检测到错误即结束
  /*const schemaStackItem = schemasStack[schemasStack.length - 1]/!*, dataStackItem = dataStack[schemaStackItem.dataIndex]*!/;
  const {state, runSchemaIndex, schema} = schemaStackItem;
  switch (state) {
    case 0:
      if (schema.length === 0) {
        schemaStackItem.state = -1;
      } else {
        schemaStackItem.runSchemaIndex = 0;
        schemaStackItem.state++;
      }
      break;
    case 1:
      schemaProperties({schemasStack, dataStack, schemaFrom: schema[runSchemaIndex], upStackItem: schemaStackItem});
      schemaStackItem.runSchemaIndex++;
      schemaStackItem.state++;
      break;
    case 2:
      if (schemaStackItem.errors.length > 0) {
        schemaStackItem.errors = [Object.assign({}, schemaStackItem)];
        schemaStackItem.state = -1;
      } else if (runSchemaIndex === schema.length) {
        schemaStackItem.state = -1;
      } else {
        schemaStackItem.state--;
      }
      break;
  }*/
};
const properties = [
  {name: 'allOf', schema: {array: true, valid: {types: ['object']}}, data: {valid: dataValid}}
];
module.exports = properties;

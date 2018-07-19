const {schemaProperties} = require('../common');
/**
 * contains关键字处理程序：data数组中的任一元素值是否符合规则
 * 举例：contains: { "type": "integer" }
 * 符合：data: [[1], [1, "foo"]]
 * 不符合: [[], ["foo", "bar"]]
 * @param schemasStack 模型栈
 * @param dataStack 数据栈
 */
const dataValid = function (schemasStack, dataStack) {
  // 方案一：全部检测完再判断
  /*const schemaStackItem = schemasStack[schemasStack.length - 1], dataStackItem = dataStack[schemaStackItem.dataIndex];
  const {data} = dataStackItem, {state, runDataIndex, schemas} = schemaStackItem;
  switch (state) {
    case 0:
      if (Array.isArray(data)) {
        if (data.length === 0) {
          schemaStackItem.errors.push(schemaStackItem);
          schemaStackItem.state = -1;
        } else {
          schemaStackItem.runDataIndex = 0;
          schemaStackItem.runSchemaErrors = [];
          schemaStackItem.state++;
        }
      } else {
        schemaStackItem.state = -1;
      }
      break;
    case 1:
      schemaProperties({schemasStack, dataStack, schemasFrom: schemas, upStackItem: schemaStackItem, data: data[runDataIndex], dataFrom: data, dataName: runDataIndex});
      schemaStackItem.runDataIndex++;
      schemaStackItem.state++;
      break;
    case 2:
      schemaStackItem.runSchemaErrors.push(schemaStackItem.errors);
      schemaStackItem.errors = [];
      if (runDataIndex < data.length) {
        schemaStackItem.state--;
      } else {
        let haveOk = false;
        const schemaErrors = schemaStackItem.runSchemaErrors;
        for (const errors of schemaErrors) {
          if (errors.length === 0) {
            haveOk = true;
            break;
          }
        }
        if (!haveOk) {
          schemaStackItem.errors.push(schemaStackItem);
          schemaStackItem.state = -1;
        } else {
          schemaStackItem.state = -2;// 置状态小于0，代表已经完成所有的过程，等于-1时处理错误信息，等于-2不处理错误信息
        }
      }
      break;
  }*/
  // 检测到任何满足条件即结束
  const schemaStackItem = schemasStack[schemasStack.length - 1], dataStackItem = dataStack[schemaStackItem.dataIndex];
  const {data} = dataStackItem, {state, runDataIndex, schemas} = schemaStackItem;
  switch (state) {
    case 0:
      if (Array.isArray(data)) {
        if (data.length === 0) {
          schemaStackItem.errors.push(schemaStackItem);
          schemaStackItem.state = -1;
        } else {
          schemaStackItem.runDataIndex = 0;
          schemaStackItem.state++;
        }
      } else {
        schemaStackItem.state = -1;
      }
      break;
    case 1:
      schemaProperties({schemasStack, dataStack, schemasFrom: schemas, upStackItem: schemaStackItem, data: data[runDataIndex], dataFrom: data, dataName: runDataIndex});
      schemaStackItem.runDataIndex++;
      schemaStackItem.state++;
      break;
    case 2:
      if (schemaStackItem.errors.length === 0) {
        schemaStackItem.state = -1;
      } else if (runDataIndex === data.length) {
        schemaStackItem.errors = [Object.assign({}, schemaStackItem)];
        schemaStackItem.state = -1;
      } else {
        schemaStackItem.errors = [];
        schemaStackItem.state--;
      }
      break;
  }
};
const contains = [
  {name: 'contains', schema: {only: true, valid: {types: ['object'],}}, data: {valid: dataValid}},];
module.exports = contains;

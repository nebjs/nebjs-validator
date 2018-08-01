const {schemaProperties} = require('../../core/common');
/**
 * contains关键字处理程序：data数组中的任一元素值是否符合规则
 * 举例：contains: { "type": "integer" }
 * 符合：data: [[1], [1, "foo"]]
 * 不符合: [[], ["foo", "bar"]]
 */
const dataValid = function (stack) {
  // 方案一：全部检测完再判断
  /*const stackItem = stack[stack.length - 1], {data, state, runDataIndex, schema} = stackItem;
  switch (state) {
    case 0:
      if (Array.isArray(data)) {
        if (data.length === 0) {
          const {dataPath} = stackItem;
          stackItem.params = {};
          stackItem.message = 'data' + dataPath + ' should contain a valid item';
          stackItem.errorItems.push(stackItem);
          stackItem.state = -1;
        } else {
          stackItem.runDataIndex = 0;
          stackItem.runSchemaErrors = [];
          stackItem.state++;
        }
      } else {
        stackItem.state = -1;
      }
      break;
    case 1:
      schemaProperties(this.context, {stack, schemaFrom: schema, parent: stackItem, data: data[runDataIndex], dataFrom: data, dataName: runDataIndex});
      stackItem.runDataIndex++;
      stackItem.state++;
      break;
    case 2:
      stackItem.runSchemaErrors.push(stackItem.errorItems);
      stackItem.errorItems = [];
      if (runDataIndex < data.length) {
        stackItem.state--;
      } else {
        let haveOk = false;
        const schemaErrors = stackItem.runSchemaErrors;
        for (const errorItems of schemaErrors) {
          if (errorItems.length === 0) {
            haveOk = true;
            break;
          }
        }
        if (!haveOk) {
          const {dataPath} = stackItem;
          stackItem.params = {};
          stackItem.message = 'data' + dataPath + ' should contain a valid item';
          stackItem.errorItems.push(stackItem);
          stackItem.state = -1;
        } else {
          stackItem.state = -2;// 置状态小于0，代表已经完成所有的过程，等于-1时处理错误信息，等于-2不处理错误信息
        }
      }
      break;
  }*/
  // 检测到任何满足条件即结束
  const stackItem = stack[stack.length - 1], {data, state, runDataIndex, schema} = stackItem;
  switch (state) {
    case 0:
      if (Array.isArray(data)) {
        if (data.length === 0) {
          const {dataPath} = stackItem;
          stackItem.params = {};
          stackItem.message = 'data' + dataPath + ' should contain a valid item';
          stackItem.errorItems.push(stackItem);
          stackItem.state = -1;
        } else {
          stackItem.runDataIndex = 0;
          stackItem.state++;
        }
      } else {
        stackItem.state = -1;
      }
      break;
    case 1:
      schemaProperties(this.context, {stack, schemaFrom: schema, parent: stackItem, data: data[runDataIndex], dataFrom: data, dataName: runDataIndex});
      stackItem.runDataIndex++;
      stackItem.state++;
      break;
    case 2:
      if (stackItem.errorItems.length === 0) {
        stackItem.state = -1;
      } else if (runDataIndex === data.length) {
        const {dataPath} = stackItem;
        stackItem.params = {};
        stackItem.message = 'data' + dataPath + ' should contain a valid item';
        stackItem.errorItems.push(stackItem);
        stackItem.state = -1;
      } else {
        stackItem.errorItems = [];
        stackItem.state--;
      }
      break;
  }
};
const contains = [
  {name: 'contains', schema: {valid: {types: ['object']}}, data: {valid: dataValid}}
];
module.exports = contains;

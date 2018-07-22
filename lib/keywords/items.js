let dataLen, itemsLen, additionalLen, sepLen, lastItemsStackItem;
const {schemaProperties} = require('../base/common');
/**
 * additionalItems关键字处理程序，当为false时，不允许添加额外多余项，当为{}时检测额外项
 */
const additionalItemsDataValid = function (stack) {
  const stackItem = stack[stack.length - 1];
  const {state} = stackItem;
  switch (state) {
    case 0:
      if (lastItemsStackItem && lastItemsStackItem.parent === stackItem.parent && additionalLen > 0) {
        const {data, schema} = stackItem;
        if (typeof schema === 'boolean') {
          if (!schema) {// 不允许继续了..
            const {dataPath} = stackItem, maxItems = itemsLen;
            stackItem.params = {maxItems};
            stackItem.message = 'data' + dataPath + ' should NOT have more than ' + maxItems + ' items';
            stackItem.errorItems.push(stackItem);
            stackItem.state = -1;
          } else {
            stackItem.state = -1;
          }
        } else {
          for (let i = dataLen - 1; i >= sepLen; --i) {
            schemaProperties({stack, schemaFrom: stackItem.schema, parent: stackItem, data: data[i], dataFrom: data, dataIndex: i});
          }
          stackItem.state++;
        }
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
 * items关键字处理程序：data数组中的元素值是否符合规则
 * 举例：items: 3
 * 符合：data: [3, 4, 5]
 * 不符合: [1, 2]
 */
const itemsDataValid = function (stack) {
  const stackItem = stack[stack.length - 1], {state, data} = stackItem;
  switch (state) {
    case 0:
      dataLen = Array.isArray(data) ? data.length : 0;
      if (dataLen > 0) {
        // 当items是对象时，一定用同一个模式验证
        const useSameItem = !Array.isArray(stackItem.rawSchema);
        if (useSameItem) {
          lastItemsStackItem = null;
          for (let i = dataLen - 1; i >= 0; --i) {
            schemaProperties({stack, schemaFrom: stackItem.schema[0], parent: stackItem, data: data[i], dataFrom: data, dataIndex: i});
          }
        } else {
          const {schema} = stackItem;
          itemsLen = schema.length;
          const minLen = Math.min(dataLen, itemsLen);
          additionalLen = dataLen - minLen;
          sepLen = dataLen - additionalLen;
          for (let i = sepLen - 1; i >= 0; --i) {
            schemaProperties({stack, schemaFrom: stackItem.schema[i], parent: stackItem, data: data[i], dataFrom: data, dataIndex: i});
          }
          lastItemsStackItem = stackItem;
        }
        stackItem.state++;
      } else {
        lastItemsStackItem = null;
        stackItem.state = -1;
      }
      break;
    case 1:
      stackItem.state = -1;
      break;
  }
};
const items = [
  {name: 'additionalItems', schema: {valid: {types: ['boolean', 'object']}}, data: {valid: additionalItemsDataValid}},
  {name: 'items', schema: {array: true, valid: {types: ['object']}}, data: {valid: itemsDataValid}}
];
module.exports = items;

let dataLen, additionalLen, sepLen, lastItemsStackItem;
const {schemaProperties} = require('../common');
/**
 * additionalItems关键字处理程序，当为false时，不允许添加额外多余项，当为{}时检测额外项
 * @param schemasStack 模型栈
 * @param dataStack 数据栈
 */
const additionalItemsDataValid = function (schemasStack, dataStack) {
  const schemaStackItem = schemasStack[schemasStack.length - 1], dataStackItem = dataStack[schemaStackItem.dataIndex];
  const {state} = schemaStackItem, {data} = dataStackItem;
  switch (state) {
    case 0:
      if (lastItemsStackItem && lastItemsStackItem.upStackItem === schemaStackItem.upStackItem && additionalLen > 0) {
        const {schema} = schemaStackItem;
        if (typeof schema === 'boolean') {
          if (!schema) {// 不允许继续了..
            schemaStackItem.errors.push(schemaStackItem);
            schemaStackItem.state = -1;
          } else {
            schemaStackItem.state = -1;
          }
        } else {
          for (let i = dataLen - 1; i >= sepLen; --i) {
            schemaProperties({schemasStack, dataStack, schemaFrom: schemaStackItem.schema, upStackItem: schemaStackItem, data: data[i], dataFrom: data, dataName: i});
          }
          schemaStackItem.state++;
        }
      } else {
        schemaStackItem.state = -1;
      }
      break;
    case 1:
      schemaStackItem.state = -1;
      break;
  }
};
/**
 * items关键字处理程序：data数组中的元素值是否符合规则
 * 举例：items: 3
 * 符合：data: [3, 4, 5]
 * 不符合: [1, 2]
 * @param schemasStack 模型栈
 * @param dataStack 数据栈
 */
const itemsDataValid = function (schemasStack, dataStack) {
  const schemaStackItem = schemasStack[schemasStack.length - 1], dataStackItem = dataStack[schemaStackItem.dataIndex];
  const {state} = schemaStackItem, {data} = dataStackItem;
  switch (state) {
    case 0:
      dataLen = Array.isArray(data) ? data.length : 0;
      if (dataLen > 0) {
        // 当items是对象时，一定用同一个模式验证
        const useSameItem = !Array.isArray(schemaStackItem.rawSchema);
        if (useSameItem) {
          lastItemsStackItem = null;
          for (let i = dataLen - 1; i >= 0; --i) {
            schemaProperties({schemasStack, dataStack, schemaFrom: schemaStackItem.schema[0], upStackItem: schemaStackItem, data: data[i], dataFrom: data, dataName: i});
          }
        } else {
          const {schema} = schemaStackItem, itemsLen = schema.length, minLen = Math.min(dataLen, itemsLen);
          additionalLen = dataLen - minLen;
          sepLen = dataLen - additionalLen;
          for (let i = sepLen - 1; i >= 0; --i) {
            schemaProperties({schemasStack, dataStack, schemaFrom: schemaStackItem.schema[i], upStackItem: schemaStackItem, data: data[i], dataFrom: data, dataName: i});
          }
          lastItemsStackItem = schemaStackItem;
        }
        schemaStackItem.state++;
      } else {
        lastItemsStackItem = null;
        schemaStackItem.state = -1;
      }
      break;
    case 1:
      schemaStackItem.state = -1;
      break;
  }
};
const items = [
  {name: 'additionalItems', schema: {valid: {types: ['boolean', 'object']}}, data: {valid: additionalItemsDataValid}},
  {name: 'items', schema: {array: true, valid: {types: ['object']}}, data: {valid: itemsDataValid}}
];
module.exports = items;

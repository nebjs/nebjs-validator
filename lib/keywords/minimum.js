let isExclusiveMinimum, lastExclusiveMinimumStackItem;
/**
 * minimum关键字处理程序：data值的是否大于等于schema（exclusiveMaximum时不能等于）
 * 举例：minimum: 3
 * 符合：data: [3, 4, 5]
 * 不符合: [1, 2]
 * @param schemasStack 模型栈
 * @param dataStack 数据栈
 */
const minimumDataValid = function (schemasStack, dataStack) {
  const schemaStackItem = schemasStack[schemasStack.length - 1], dataStackItem = dataStack[schemaStackItem.dataIndex];
  const {data} = dataStackItem, {schema} = schemaStackItem;
  if (typeof data === 'number') {
    let ok = false;
    if (isExclusiveMinimum && lastExclusiveMinimumStackItem.upStackItem === schemaStackItem.upStackItem) {
      // 大于模式
      ok = data > schema;
    } else {
      // 大于等于模式
      ok = data >= schema;
    }
    if (!ok) {
      schemaStackItem.errors.push(schemaStackItem);
    }
  }
  schemaStackItem.state = -1;
};
/**
 * exclusiveMinimum关键字处理程序：data值的是否大于schema
 * 举例：exclusiveMinimum: 3
 * 符合：data: [4, 5]
 * 不符合: [1, 2, 3]
 * @param schemasStack 模型栈
 * @param dataStack 数据栈
 */
const exclusiveMinimumDataValid = function (schemasStack, dataStack) {
  const schemaStackItem = schemasStack[schemasStack.length - 1], dataStackItem = dataStack[schemaStackItem.dataIndex];
  const {data} = dataStackItem, {schema} = schemaStackItem;
  const tp = typeof schema;
  if (tp === 'number') {
    if (typeof data === 'number') {
      if (data <= schema) {
        schemaStackItem.errors.push(schemaStackItem);
      }
    }
  } else {
    isExclusiveMinimum = schema;
    lastExclusiveMinimumStackItem = schemaStackItem;
  }
  schemaStackItem.state = -1;
};
const minimum = [
  {name: 'minimum', schema: {valid: {types: ['number']}}, data: {valid: minimumDataValid}},
  {name: 'exclusiveMinimum', schema: {valid: {types: ['number', 'boolean']}}, data: {valid: exclusiveMinimumDataValid}}
];
module.exports = minimum;

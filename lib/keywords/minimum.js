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
  const {data} = dataStackItem, {schemas} = schemaStackItem;
  if (typeof data === 'number') {
    let ok = false;
    // schemaFrom, keyPath, upStackItem三者有一个相同都代表来自同一个上级，说明是与当前minimum是兄弟的then
    if (isExclusiveMinimum && lastExclusiveMinimumStackItem.schemaFrom === schemaStackItem.schemaFrom) {
      // 大于模式
      ok = data > schemas[0];
    } else {
      // 大于等于模式
      ok = data >= schemas[0];
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
  const {data} = dataStackItem, {schemas} = schemaStackItem;
  const tp = typeof schemas[0];
  if (tp === 'number') {
    if (typeof data === 'number') {
      if (data <= schemas[0]) {
        schemaStackItem.errors.push(schemaStackItem);
      }
    }
  } else {
    isExclusiveMinimum = schemas[0];
    lastExclusiveMinimumStackItem = schemaStackItem;
  }
  schemaStackItem.state = -1;
};
const minimum = [
  {name: 'minimum', schema: {only: true, valid: {types: ['number']}}, data: {valid: minimumDataValid}},
  {name: 'exclusiveMinimum', schema: {only: true, valid: {types: ['number', 'boolean']}}, data: {valid: exclusiveMinimumDataValid}}];
module.exports = minimum;

let isExclusiveMaximum, lastExclusiveMaximumStackItem;
/**
 * maximum关键字处理程序：data值的是否小于等于schema（exclusiveMaximum时不能等于）
 * 举例：maximum: 3
 * 符合：data: [1, 2, 3]
 * 不符合: [4, 5, 6]
 * @param schemasStack 模型栈
 * @param dataStack 数据栈
 */
const maximumDataValid = function (schemasStack, dataStack) {
  const schemaStackItem = schemasStack[schemasStack.length - 1], dataStackItem = dataStack[schemaStackItem.dataIndex];
  const {data} = dataStackItem, {schemas} = schemaStackItem;
  if (typeof data === 'number') {
    let ok = false;
    // schemaFrom, keyPath, upStackItem三者有一个相同都代表来自同一个上级，说明是与当前maximum是兄弟的then
    if (isExclusiveMaximum && lastExclusiveMaximumStackItem.schemaFrom === schemaStackItem.schemaFrom) {
      // 小于模式
      ok = data < schemas[0];
    } else {
      // 小于等于模式
      ok = data <= schemas[0];
    }
    if (!ok) {
      schemaStackItem.errors.push(schemaStackItem);
    }
  }
  schemaStackItem.state = -1;
};
/**
 * exclusiveMaximum关键字处理程序：data值的是否小于schema
 * 举例：exclusiveMaximum: 3
 * 符合：data: [1, 2]
 * 不符合: [3, 4, 5, 6]
 * @param schemasStack 模型栈
 * @param dataStack 数据栈
 */
const exclusiveMaximumDataValid = function (schemasStack, dataStack) {
  const schemaStackItem = schemasStack[schemasStack.length - 1], dataStackItem = dataStack[schemaStackItem.dataIndex];
  const {data} = dataStackItem, {schemas} = schemaStackItem;
  const tp = typeof schemas[0];
  if (tp === 'number') {
    if (typeof data === 'number') {
      if (data >= schemas[0]) {
        schemaStackItem.errors.push(schemaStackItem);
      }
    }
  } else {
    isExclusiveMaximum = schemas[0];
    lastExclusiveMaximumStackItem = schemaStackItem;
  }
  schemaStackItem.state = -1;
};
const maximum = [
  {name: 'maximum', schema: {only: true, valid: {types: ['number']}}, data: {valid: maximumDataValid}},
  {name: 'exclusiveMaximum', schema: {only: true, valid: {types: ['number', 'boolean']}}, data: {valid: exclusiveMaximumDataValid}}];
module.exports = maximum;

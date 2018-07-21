let isExclusiveMaximum, lastExclusiveMaximumStackItem;
/**
 * maximum关键字处理程序：data值的是否小于等于schema（exclusiveMaximum时不能等于）
 * 举例：maximum: 3
 * 符合：data: [1, 2, 3]
 * 不符合: [4, 5, 6]
 * @param stack 栈
 */
const maximumDataValid = function (stack) {
  const stackItem = stack[stack.length - 1], {data, schema} = stackItem;
  if (typeof data === 'number') {
    let ok = false;
    // schemaFrom, schemaPath, parent三者有一个相同都代表来自同一个上级，说明是与当前maximum是兄弟的then
    if (isExclusiveMaximum && lastExclusiveMaximumStackItem.parent === stackItem.parent) {
      // 小于模式
      ok = data < schema;
    } else {
      // 小于等于模式
      ok = data <= schema;
    }
    if (!ok) {
      stackItem.errorItems.push(stackItem);
    }
  }
  stackItem.state = -1;
};
/**
 * exclusiveMaximum关键字处理程序：data值的是否小于schema
 * 举例：exclusiveMaximum: 3
 * 符合：data: [1, 2]
 * 不符合: [3, 4, 5, 6]
 * @param stack 栈
 */
const exclusiveMaximumDataValid = function (stack) {
  const stackItem = stack[stack.length - 1], {data, schema} = stackItem;
  const tp = typeof schema;
  if (tp === 'number') {
    if (typeof data === 'number') {
      if (data >= schema) {
        stackItem.errorItems.push(stackItem);
      }
    }
  } else {
    isExclusiveMaximum = schema;
    lastExclusiveMaximumStackItem = stackItem;
  }
  stackItem.state = -1;
};
const maximum = [
  {name: 'maximum', schema: {valid: {types: ['number']}}, data: {valid: maximumDataValid}},
  {name: 'exclusiveMaximum', schema: {valid: {types: ['number', 'boolean']}}, data: {valid: exclusiveMaximumDataValid}}
];
module.exports = maximum;

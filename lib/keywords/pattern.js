/**
 * pattern关键字处理程序：data字符串值的格式满足pattern对应的正则表达式
 * 举例：pattern: ['^[abc]+$']
 * 符合：data: "a", "abc", "cde"
 * 不符合: data: "d", "abd", "def", "123", ""
 * @param stack 栈
 */
const dataValid = function (stack) {
  const stackItem = stack[stack.length - 1], {data, schema} = stackItem;
  if (typeof data === 'string') {
    let valid = false;
    for (const val of schema) {
      const pattern = typeof val === 'string' ? new RegExp(val) : val;
      if (pattern) {
        valid = pattern.test(data);
        if (valid) break;
      }
    }
    if (!valid) {
      stackItem.errorItems.push(stackItem);
    }
  }
  stackItem.state = -1;
};
const pattern = [
  {name: 'pattern', schema: {array: true, valid: {types: ['regexp']}}, data: {valid: dataValid}}
];
module.exports = pattern;

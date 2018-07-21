/**
 * patternRequired关键字处理程序：data中是否有满足正则条件名称的相应属性...
 * 举例：patternRequired: ["f.*o", "b.*r"]
 * 符合：data: [{ "foo": 1, "bar": 2 }, { "foobar": 3 }]
 * 不符合: data: [{}, { "foo": 1 }, { "bar": 2 }]
 * @param stack 栈
 */
const dataValid = function (stack) {
  const stackItem = stack[stack.length - 1], {data, schema} = stackItem;
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    for (const val of schema) {
      const reg = new RegExp(val);
      if (reg) {
        let hasOk = false;
        for (const name in data) {
          if (data.hasOwnProperty(name) && reg.test(name)) {
            hasOk = true;
            break;
          }
        }
        if (!hasOk) {
          stackItem.errorItems.push(stackItem);
          break;
        }
      }
    }
  }
  stackItem.state = -1;
};
const patternRequired = [
  {name: 'patternRequired', schema: {array: true, valid: {types: ['string']}}, data: {valid: dataValid}}
];
module.exports = patternRequired;

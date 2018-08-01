/**
 * patternRequired关键字处理程序：data中是否有满足正则条件名称的相应属性...
 * 举例：patternRequired: ["f.*o", "b.*r"]
 * 符合：data: [{ "foo": 1, "bar": 2 }, { "foobar": 3 }]
 * 不符合: data: [{}, { "foo": 1 }, { "bar": 2 }]
 */
const dataValid = function (stack) {
  const stackItem = stack[stack.length - 1], {data, schema} = stackItem;
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    for (const val of schema) {
      const pattern = typeof val === 'string' ? new RegExp(val) : val;
      if (pattern) {
        let hasOk = false;
        for (const name in data) {
          if (data.hasOwnProperty(name) && pattern.test(name)) {
            hasOk = true;
            break;
          }
        }
        if (!hasOk) {
          const {dataPath} = stackItem;
          stackItem.params = {pattern: schema};
          stackItem.message = 'data' + dataPath + ' should have property match to one of the pattern';
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

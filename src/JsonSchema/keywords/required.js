/**
 * required关键字处理程序：data中是否有相应的属性...
 * 举例：required: ["a", "b"]
 * 符合：data: [{"a": 1, "b": 2}, {"a": 1, "b": 2, "c": 3}]
 * 不符合: data: [{}, {"a": 1}, {"c": 3, "d":4}]
 */
const dataValid = function (stack) {
  const stackItem = stack[stack.length - 1], {data, schema} = stackItem;
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    for (const val of schema) {
      if (!data.hasOwnProperty(val)) {
        const {dataPath} = stackItem;
        stackItem.params = {required: schema};
        stackItem.message = 'data' + dataPath + ' should have required property ' + schema.toString();
        stackItem.errorItems.push(stackItem);
        break;
      }
    }
  }
  stackItem.state = -1;
};
const required = [
  {name: 'required', schema: {array: true, valid: {types: ['string']}}, data: {valid: dataValid}}
];
module.exports = required;

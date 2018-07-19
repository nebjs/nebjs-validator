/**
 * patternRequired关键字处理程序：data中是否有满足正则条件名称的相应属性...
 * 举例：patternRequired: ["f.*o", "b.*r"]
 * 符合：data: [{ "foo": 1, "bar": 2 }, { "foobar": 3 }]
 * 不符合: data: [{}, { "foo": 1 }, { "bar": 2 }]
 * @param schemasStack 模型栈
 * @param dataStack 数据栈
 */
const dataValid = function (schemasStack, dataStack) {
  const schemaStackItem = schemasStack[schemasStack.length - 1], dataStackItem = dataStack[schemaStackItem.dataIndex];
  const {data} = dataStackItem, {schemas} = schemaStackItem;
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    for (const schema of schemas) {
      const reg = new RegExp(schema);
      if (reg) {
        let hasOk = false;
        for (const name in data) {
          if (data.hasOwnProperty(name) && reg.test(name)) {
            hasOk = true;
            break;
          }
        }
        if (!hasOk) {
          schemaStackItem.errors.push(schemaStackItem);
          break;
        }
      }
    }
  }
  schemaStackItem.state = -1;
};
const patternRequired = [{name: 'patternRequired', schema: {valid: {types: ['string']}}, data: {valid: dataValid}}];
module.exports = patternRequired;

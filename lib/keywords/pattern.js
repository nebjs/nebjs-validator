/**
 * pattern关键字处理程序：data字符串值的格式满足pattern对应的正则表达式
 * 举例：pattern: ['^[abc]+$']
 * 符合：data: "a", "abc", "cde"
 * 不符合: data: "d", "abd", "def", "123", ""
 * @param schemasStack 模型栈
 * @param dataStack 数据栈
 */
const dataValid = function (schemasStack, dataStack) {
  const schemaStackItem = schemasStack[schemasStack.length - 1], dataStackItem = dataStack[schemaStackItem.dataIndex];
  const {data} = dataStackItem, {schemas} = schemaStackItem;
  if (typeof data === 'string') {
    let valid = false;
    for (const schema of schemas) {
      const pattern = new RegExp(schema);
      if (pattern) {
        valid = pattern.test(data);
        if (valid) break;
      }
    }
    if (!valid) {
      schemaStackItem.errors.push(schemaStackItem);
    }
  }
  schemaStackItem.state = -1;
};
const pattern = [{name: 'pattern', schema: {valid: {types: ['string']}}, data: {valid: dataValid}}];
module.exports = pattern;

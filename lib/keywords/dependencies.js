const {schemaProperties} = require('../common');
/**
 * dependencies关键字处理程序：data对象的子属性验证...
 * 举例：{"dependencies":{"foo": ["bar", "baz"]}}
 * 符合：data: [{"foo": 1, "bar": 2, "baz": 3}, {}, {"a": 1}]
 * 不符合: data: [{"foo": 1}, {"foo": 1, "bar": 2}, {"foo": 1, "baz": 3}]
 * @param schemasStack 模型栈
 * @param dataStack 数据栈
 */
const dataValid = function (schemasStack, dataStack) {
  const schemaStackItem = schemasStack[schemasStack.length - 1], dataStackItem = dataStack[schemaStackItem.dataIndex];
  const {data} = dataStackItem, {state, schema} = schemaStackItem;
  let doIt;
  switch (state) {
    case 0:
      doIt = false;
      if (data && typeof data === 'object' && !Array.isArray(data)) {
        if (schema) {
          for (const propName in schema) {
            if (schema.hasOwnProperty(propName) && data.hasOwnProperty(propName)) {
              const propSchema = schema[propName];
              if (Array.isArray(propSchema)) {
                let hasError = false;
                for (const name of propSchema) {
                  if (name && typeof name === 'string' && !data.hasOwnProperty(name)) {
                    hasError = true;
                    break;
                  }
                }
                if (hasError) schemaStackItem.errors.push(schemaStackItem);
              } else if (typeof schema === 'object') {
                if (schemaProperties({schemasStack, dataStack, schemaFrom: propSchema, upStackItem: schemaStackItem})) doIt = true;
              }
            }
          }
        }
      }
      if (!doIt) {
        schemaStackItem.state = -1;
      } else {
        schemaStackItem.state++;
      }
      break;
    case 1:
      schemaStackItem.state = -1;
      break;
  }
};
const dependencies = [
  {name: 'dependencies', schema: {valid: {types: ['object']}}, data: {valid: dataValid}}
];
module.exports = dependencies;

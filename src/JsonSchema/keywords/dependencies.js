const {schemaProperties} = require('../../core/common');
/**
 * dependencies关键字处理程序：data对象的子属性验证...
 * 举例：{"dependencies": {"foo": ["bar", "baz"]}}
 * 符合：data: [{"foo": 1, "bar": 2, "baz": 3}, {}, {"a": 1}]
 * 不符合: data: [{"foo": 1}, {"foo": 1, "bar": 2}, {"foo": 1, "baz": 3}]
 */
const dataValid = function (stack) {
  const stackItem = stack[stack.length - 1], {data, state, schema} = stackItem;
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
                const dependCount = propSchema.length;
                if (dependCount > 0) {
                  let name, hasError = false;
                  for (name of propSchema) {
                    if (name && typeof name === 'string' && !data.hasOwnProperty(name)) {
                      hasError = true;
                      break;
                    }
                  }
                  if (hasError) {
                    const {dataPath} = stackItem;
                    stackItem.params = {propName, missingProperty: name, dependCount, depend: propSchema, depends: propSchema};
                    stackItem.message = 'data' + dataPath + ' should be equal to constant';
                    stackItem.errorItems.push(stackItem);
                  }
                }
              } else if (typeof schema === 'object') {
                if (schemaProperties(this.context, {stack, schemaFrom: propSchema, parent: stackItem})) doIt = true;
              }
            }
          }
        }
      }
      if (!doIt) {
        stackItem.state = -1;
      } else {
        stackItem.state++;
      }
      break;
    case 1:
      stackItem.state = -1;
      break;
  }
};
const dependencies = [
  {name: 'dependencies', schema: {valid: {types: ['object']}}, data: {valid: dataValid}}
];
module.exports = dependencies;

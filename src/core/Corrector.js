const common = require('./common');
const {validateSchema, schemaProperties} = common;
const Context = require('./Context');
const nebUtil = require('nebjs-util');
const objPick = nebUtil.object.pick;
// const objCopy = nebUtil.object.copy;
const arrCopy = nebUtil.array.copy;

/**
 * 分析器类
 */
class Corrector {
  /**
   * @param context {Context} 环境
   * @param schemas {Object|Array} 验证模型
   * @param option {Object} 配置
   */
  constructor(context, schemas, option = {}) {
    if (!(context && context instanceof Context)) throw new TypeError('context must be a Context object');
    if (!(schemas && (schemas.constructor === Object || Array.isArray(schemas)))) throw new TypeError('schemas must be a object or array');
    this.schemas = schemas;
    this.context = context;
    this.data = null;
    this.errorItems = [];
  }

  /**
   * 验证有效性
   * @param data {*} 验证数据
   * @returns {boolean}
   */
  validate(data) {
    this.data = data;
    const {context} = this, {keywords} = context, errorItems = this.errorItems = [], stack = [], schemas = this.schemas;
    schemaProperties(context, {stack, schemaFrom: schemas, data, dataFrom: null});
    while (stack.length > 0) {
      const stackItem = stack[stack.length - 1], {keyword} = stackItem, option = keywords.getData(keyword).value;
      let {state} = stackItem, pop = false;
      if (!(state < 0)) {
        const {data} = option, {valid} = data;
        if (state === 0) validateSchema(context, stackItem);
        if (valid) {
          valid.call(this, stack);
          state = stackItem.state;
          if (state < 0) pop = true;
        } else pop = true;
      } else pop = true;
      if (pop) {
        const {parent, errorItems: stackErrorItems} = stackItem;
        if (state === -1 && stackErrorItems.length > 0) {
          const to = parent ? parent.errorItems : errorItems;
          for (const errorItem of stackErrorItems) {
            to.push(errorItem);
          }
        }
        stack.pop();
      }
    }
    if (errorItems.length > 0) {
      for (const stackItem of errorItems) {
        const {keyword} = stackItem, option = keywords.getData(keyword).value, {data} = option, {error} = data;
        if (error) error.call(this, stackItem, option);
      }
      return false;
    }
    return true;
  }

  /**
   * 输出错误
   * @param option 输出配置
   */
  writeOutErrors(option = {}) {
    const validator = this, {errorItems} = validator;
    const {simple = true} = option;
    let out;
    if (simple) {
      out = arrCopy([], errorItems, {
        multi: true, filter: function (array, stackItems, stackItem/*, index*/) {
          const obj = {};
          return {value: objPick(obj, stackItem, {pick: ['keyword', 'message', 'params']})};
        }
      })
    }
    // 开始处理错误...
    return out;
  }
}

module.exports = Corrector;

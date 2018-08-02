const common = require('./common');
const {validateSchema, schemaProperties} = common;
const Context = require('./Context');
const nebUtil = require('nebjs-util');
// const objPick = nebUtil.object.pick;
// const objCopy = nebUtil.object.copy;
const arrCopy = nebUtil.array.copy;
const {Parser: TempParser} = require('nebjs-template-string-simple');

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
    const {context} = this, errorItems = this.errorItems = [], stack = [], schemas = this.schemas;
    schemaProperties(context, {stack, schemaFrom: schemas, data, dataFrom: null});
    while (stack.length > 0) {
      const stackItem = stack[stack.length - 1], {keyword} = stackItem;
      let {state} = stackItem, pop = false;
      if (!(state < 0)) {
        const {data} = keyword, {valid} = data;
        if (state === 0) validateSchema(stackItem);
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
        const {keyword} = stackItem, {data} = keyword, {error} = data;
        if (error) error.call(this, stackItem);
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
    const corrector = this, {errorItems} = corrector;
    let out;
    out = arrCopy([], errorItems, {
      multi: true, filter: function (array, stackItems, stackItem/*, index*/) {
        const obj = {};
        let msg = stackItem.message = stackItem.keyword.ext.message;
        obj.keyword = stackItem.keyword.name;
        if (msg) {
          if (typeof msg === 'function') msg = msg(stackItem);
          if (typeof msg === 'string') obj.message = msg ? new TempParser(stackItem).parse(msg) : '';
        }
        return {value: obj};
      }
    });
    // 开始处理错误...
    return out;
  }
}

module.exports = Corrector;

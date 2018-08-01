const {Data} = require('nebjs-util').data;
const nebUtil = require('nebjs-util');
const objCopy = nebUtil.object.copy;

/**
 * 校正器环境类
 */
class Keywords extends Data {
  /**
   * 校正器环境对象
   */
  constructor() {
    super();
  }

  /**
   * 注册Keyword
   * @param keywords
   * @return {Number}
   * [{
   *  name: '', 注册关键字名称
   *  schema: {
   *    array: false, 为数组，当不是数组时，自动转换
   *    valid: {// 用于模型验证,
   *      types: ['', ..], 注册关键字支持的类型
   *      value: function(val){}, 关键字值验证器
   *    }
   *  },
   *  data: {
   *    valid: function(stack){}, 关键字验证器
   *    error: function(stack){}, 关键字错误处理器
   *  },
   *  ext: {}, 用户扩展信息
   * },..]
   */
  register(keywords) {
    if (!(keywords && Array.isArray(keywords) && keywords.length > 0)) throw new TypeError('keywords must be a non-empty string');
    for (const keyword of keywords) {
      if (!(keyword && keyword.constructor === Object)) throw new TypeError('keyword must be a object');
      const {name} = keyword;
      if (!(name && typeof name === 'string' && name.length > 0)) throw new TypeError('keyword\'s name must be a non-empty string');
      if (this.getData(name) !== void 0) throw new TypeError('keyword ' + name + ' have already registered');
      const key = objCopy({schema: {array: false, valid: {types: [], value: null}}, data: {valid: null, error: null}, ext: {}}, keyword, {deep: true});
      let {schema, data, ext} = key;
      if (schema.constructor !== Object) throw new TypeError('keyword ' + name + ' \'s schema must be a object');
      if (data.constructor !== Object) throw new TypeError('keyword ' + name + ' \'s data must be a object');
      const {array, valid} = schema;
      if (array !== true && array !== false) throw new TypeError('keyword ' + name + ' \'s schema.array must be a boolean');
      if (valid) {
        if (valid.constructor !== Object) throw new TypeError('keyword ' + name + '\'s schema.valid must be a object');
        const {types, value} = valid;
        if (!(types && Array.isArray(types))) throw new TypeError('keyword ' + name + '\'s schema.valid.types must be a array');
        if (value && typeof value !== 'function') throw new TypeError('keyword ' + name + '\'s schema.valid.value must be a function');
      }
      const {valid: dataValid, error: dataError} = data;
      if (dataValid && typeof dataValid !== 'function') throw new TypeError('keyword ' + name + '\'s data.valid must be a function');
      if (dataError && typeof dataError !== 'function') throw new TypeError('keyword ' + name + '\'s data.error must be a function');
      if (!(ext && ext.constructor === Object)) throw new TypeError('keyword ' + name + '\'s ext must be a object');
      this.setData(name, key);
    }
  }
}

module.exports = Keywords;

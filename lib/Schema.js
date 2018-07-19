const {validate} = require('./common');
const keys = require('./keys');
const keywords = require('./keywords/index');

/**
 * 验证器类
 */
class Schema {
  /**
   * 构造一个某个模型、某种配置的验证器对象
   * @param schemas {Object|Array} 验证模型
   * @param options {Object} 验证配置
   */
  constructor(schemas, options) {
    this.schemas = schemas;
    this.data = null;
    this.errors = [];
    this.options = Object.assign({}, options);
  }

  /**
   * 验证数据
   * @param data 需要验证的数据对象
   * @return {Boolean} 验证成功与否
   * 注：每次验证完成后，要得到错误信息，必须在再次调用此方法前访问errors属性对象
   */
  validate(data) {
    return validate.call(this, data);
  }
}

/**
 * 验证器类上附加的静态方法和属性对象
 */
Object.assign(Schema, keys);
/**
 * 注册内置的各关键字
 */
Schema.registerKeywords(keywords);
module.exports = Schema;

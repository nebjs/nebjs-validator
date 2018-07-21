// const nebUtil = require('nebjs-util');
// const objPick = nebUtil.object.pick;
// const objCopy = nebUtil.object.copy;
// const arrCopy = nebUtil.array.copy;
/**
 * 输出错误
 * @param option 输出配置
 */
const writeOutErrors = function (option = {}) {
  const validator = this, {errors} = validator;
  const {simple = true} = option;
  let out;
  if (simple) {
    out = errors;
  }
  // 开始处理错误...
  return out;
};
module.exports = {writeOutErrors};

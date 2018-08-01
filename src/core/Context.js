const {Data, HashData} = require('nebjs-util').data;
const Keywords = require('./Keywords');

/**
 * 校正器环境类
 */
class Context {
  constructor() {
    this.keywords = new Keywords();
    this.data = new Data();
    this.hash = new HashData();
  }
}

module.exports = Context;

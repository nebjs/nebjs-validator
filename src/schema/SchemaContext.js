const Context = require('../core/Context');
const keywords = require('./keywords/index');

class SchemaContext extends Context {
  constructor() {
    super();
    this.keywords.register(keywords);
  }
}

module.exports = SchemaContext;

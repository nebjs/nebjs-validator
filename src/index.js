const common = require('./core/common');
const Context = require('./core/Context');
const Corrector = require('./core/Corrector');
const JsonSchemaContext = require('./JsonSchema/JsonSchemaContext');
const schema = {common, Context, JsonSchemaContext, Corrector};
module.exports = schema;

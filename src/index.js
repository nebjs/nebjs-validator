const common = require('./core/common');
const Context = require('./core/Context');
const Corrector = require('./core/Corrector');
const JsonSchemaContext = require('./schema/SchemaContext');
const schema = {common, Context, SchemaContext: JsonSchemaContext, Corrector};
module.exports = schema;

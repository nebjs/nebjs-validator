const expect = require('chai').expect;
const {Schema: ValidatorSchema} = require('../../../build/dev/nebjs-validator');   // require('../../../lib/index');
describe('验证器 关键字【propertyNames】的测试', function () {
  it('{"propertyNames": { "format": "email" }} ' +
    '测试： valid: [{"foo@bar.com": "any", "bar@bar.com": "any"}], invalid: [{"foo": 1}, {"foo": "a", "bar": 1}]', function () {
    const valid = [{"foo@bar.com": "any", "bar@bar.com": "any"}], invalid = [{"foo": "any value"}];
    const validator = new ValidatorSchema({"propertyNames": { "format": "email" }}, {});
    for (const v of valid) expect(validator.validate(v)).to.equal(true);
    for (const v of invalid) expect(validator.validate(v)).to.equal(false);
  });
});

const expect = require('chai').expect;
const {Schema: ValidatorSchema} = require('../../../build/dev/nebjs-validator');   // require('../../../lib/index');
describe('验证器 关键字【contains】的测试', function () {
  it('{"contains": {type: "integer"}} 测试： valid: [[1], [1, "foo"]], invalid: [[], ["foo", "bar"]]', function () {
    const valid = [[1], [1, 'foo']], invalid = [[], ['foo', 'bar']];
    const validator = new ValidatorSchema({contains: {type: 'integer'}}, {});
    for (const v of valid) expect(validator.validate(v)).to.equal(true);
    for (const v of invalid) expect(validator.validate(v)).to.equal(false);
  });
});

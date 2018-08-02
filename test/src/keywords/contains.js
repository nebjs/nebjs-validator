const expect = require('chai').expect;
const {Schema: correctorSchema} = require('../../../build/dev/nebjs-corrector');   // require('../../../lib/index');
describe('验证器 关键字【contains】的测试', function () {
  it('{"contains": {type: "integer"}} 测试： valid: [[1], [1, "foo"]], invalid: [[], ["foo", "bar"]]', function () {
    const valid = [[1], [1, 'foo']], invalid = [[], ['foo', 'bar']];
    const corrector = new correctorSchema({contains: {type: 'integer'}}, {});
    for (const v of valid) expect(corrector.validate(v)).to.equal(true);
    for (const v of invalid) expect(corrector.validate(v)).to.equal(false);
  });
});

const expect = require('chai').expect;
const {Schema: correctorSchema} = require('../../../build/dev/nebjs-corrector');   // require('../../../lib/index');
describe('验证器 关键字【oneOf】的测试', function () {
  it('{"oneOf": [1.5, 2, 2.5, 3, 4, 5]} 测试： valid: [2, 3], invalid: [4.5, 5.5]', function () {
    const valid = [1.5, 2, 2.5, 3, 4, 5], invalid = [4.5, 5.5];
    const corrector = new correctorSchema({oneOf: [{'maximum': 3}, {'type': 'integer'}]}, {});
    for (const v of valid) expect(corrector.validate(v)).to.equal(true);
    for (const v of invalid) expect(corrector.validate(v)).to.equal(false);
  });
});

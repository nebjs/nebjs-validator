const expect = require('chai').expect;
const {Schema: ValidatorSchema} = require('../../../build/dev/nebjs-validator');   // require('../../../lib/index');
describe('验证器 关键字【allOf】的测试', function () {
  it('{"allOf": [2, 3]} 测试： valid: [2, 3], invalid: [1.5, 2.5, 4, 4.5, 5, 5.5]', function () {
    const valid = [2, 3], invalid = [1.5, 2.5, 4, 4.5, 5, 5.5];
    const validator = new ValidatorSchema({allOf: [{'maximum': 3}, {'type': 'integer'}]}, {});
    for (const v of valid) expect(validator.validate(v)).to.equal(true);
    for (const v of invalid) expect(validator.validate(v)).to.equal(false);
  });
});

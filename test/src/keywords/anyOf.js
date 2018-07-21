const expect = require('chai').expect;
const {Schema: ValidatorSchema} = require('../../../build/dev/nebjs-validator');   // require('../../../lib/index');
describe('验证器 关键字【anyOf】的测试', function () {
  it('{"anyOf": [{"maximum": 3}, {"type": "integer"}]} 测试： valid: [2, 3], invalid: [4.5, 5.5]', function () {
    const valid = [1.5, 2, 2.5, 3, 4, 5], invalid = [4.5, 5.5];
    const validator = new ValidatorSchema({anyOf: [{'maximum': 3}, {'type': 'integer'}]}, {});
    for (const v of valid) expect(validator.validate(v)).to.equal(true);
    for (const v of invalid) expect(validator.validate(v)).to.equal(false);
  });
});

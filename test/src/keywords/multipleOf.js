const expect = require('chai').expect;
const {Schema: ValidatorSchema} = require('../../../build/dev/nebjs-validator');   // require('../../../lib/index');
describe('验证器 关键字【multipleOf】的测试', function () {
  it('{"multipleOf": 1} 测试： valid: [1, 5, 7], invalid: [1.1, 2.2, 5.7]', function () {
    const valid = [1, 5, 7], invalid = [1.1, 2.2, 5.7];
    const validator = new ValidatorSchema({multipleOf: 1}, {});
    for (const v of valid) expect(validator.validate(v)).to.equal(true);
    for (const v of invalid) expect(validator.validate(v)).to.equal(false);
  });
  it('{"multipleOf": 2.5} 测试： valid: [5, 10, 15], invalid: [1, 8, 12]', function () {
    const valid = [5, 10, 15], invalid = [1, 8, 12];
    const validator = new ValidatorSchema({multipleOf: 2.5}, {});
    for (const v of valid) expect(validator.validate(v)).to.equal(true);
    for (const v of invalid) expect(validator.validate(v)).to.equal(false);
  });
});

const expect = require('chai').expect;
const {Schema: ValidatorSchema} = require('../../../build/dev/nebjs-validator');   // require('../../../lib/index');
describe('验证器 关键字【required】的测试', function () {
  it('{"required": ["a", "b"]} 测试： valid: [{"a": 1, "b": 2}, {"a": 1, "b": 2, "c": 3}], invalid: [{}, {"a": 1}, {"c": 3, "d":4}]', function () {
    const valid = [{'a': 1, 'b': 2}, {'a': 1, 'b': 2, 'c': 3}], invalid = [{}, {'a': 1}, {'c': 3, 'd':4}];
    const validator = new ValidatorSchema({required: ['a', 'b']}, {});
    for (const v of valid) expect(validator.validate(v)).to.equal(true);
    for (const v of invalid) expect(validator.validate(v)).to.equal(false);
  });
});

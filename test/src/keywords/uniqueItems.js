const expect = require('chai').expect;
const {Schema: ValidatorSchema} = require('../../../build/dev/nebjs-validator');   // require('../../../lib/index');
describe('验证器 关键字【uniqueItems】的测试', function () {
  it('{"uniqueItems": true} 测试： valid: [[], [1, 2, 3], [1, "a"]], invalid: [[1, 1, 2], [1, {"a": "b", "b": "c"}, {"b": "c", "a": "b"}]', function () {
    const valid = [[], [1, 2, 3], [1, 'a']], invalid = [[1, 1, 2], [1, {'a': 'b', 'b': 'c'}, {'b': 'c', 'a': 'b'}]];
    const validator = new ValidatorSchema({uniqueItems: true}, {});
    for (const v of valid) expect(validator.validate(v)).to.equal(true);
    for (const v of invalid) expect(validator.validate(v)).to.equal(false);
  });
});

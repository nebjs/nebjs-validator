const expect = require('chai').expect;
const {Schema: correctorSchema} = require('../../../build/dev/nebjs-corrector');   // require('../../../lib/index');
describe('验证器 关键字【required】的测试', function () {
  it('{"patternRequired":["f.*o"]} 测试： valid: [{"foo": 1}, {"-fo-": 1}, {"foo": 1, "bar": 2}, {"foobar": 3}], invalid: [{}, {"bar": 2}, {"Foo": 1}]', function () {
    const valid = [{'foo': 1}, {'-fo-': 1}, {'foo': 1, 'bar': 2}], invalid = [{}, {'bar': 2}, {'Foo': 1}];
    const corrector = new correctorSchema({'patternRequired': ['f.*o']}, {});
    for (const v of valid) expect(corrector.validate(v)).to.equal(true);
    for (const v of invalid) expect(corrector.validate(v)).to.equal(false);
  });
  it('{"patternRequired": ["f.*o", "b.*r"]} 测试： valid: [{"foo": 1, "bar": 2}, {"foobar": 3}], invalid: [{}, {"foo": 1}, {"bar": 2}]', function () {
    const valid = [{'foo': 1, 'bar': 2}, {'foobar': 3}], invalid = [{}, {'foo': 1}, {'bar': 2}];
    const corrector = new correctorSchema({'patternRequired': ['f.*o', 'b.*r']}, {});
    for (const v of valid) expect(corrector.validate(v)).to.equal(true);
    for (const v of invalid) expect(corrector.validate(v)).to.equal(false);
  });
});

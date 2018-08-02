const expect = require('chai').expect;
const {Schema: correctorSchema} = require('../../../build/dev/nebjs-corrector');   // require('../../../lib/index');
describe('验证器 关键字【dependencies】的测试', function () {
  it('{"dependencies":{"foo": ["bar", "baz"]}} ' +
    '测试： valid: [{"foo": 1, "bar": 2, "baz": 3}, {}, {"a": 1}], invalid: [{"foo": 1}, {"foo": 1, "bar": 2}, {"foo": 1, "baz": 3}]', function () {
    const valid = [{'foo': 1, 'bar': 2, 'baz': 3}, {}, {'a': 1}], invalid = [{'foo': 1}, {'foo': 1, 'bar': 2}, {'foo': 1, 'baz': 3}];
    const corrector = new correctorSchema({'dependencies': {'foo': ['bar', 'baz']}}, {});
    for (const v of valid) expect(corrector.validate(v)).to.equal(true);
    for (const v of invalid) expect(corrector.validate(v)).to.equal(false);
  });
  it('{"dependencies":{"foo":{"properties":{"bar":{"type":"number"}}}}} ' +
    '测试： valid: [{}, {"foo": 1}, {"foo": 1, "bar": 2}, {"a": 1}], invalid: [{"foo": 1, "bar": "a"}]', function () {
    const valid = [{}, {'foo': 1}, {'foo': 1, 'bar': 2}, {'a': 1}], invalid = [{'foo': 1, 'bar': 'a'}];
    const corrector = new correctorSchema({'dependencies':{'foo':{'properties':{'bar':{'type':'number'}}}}}, {});
    for (const v of valid) expect(corrector.validate(v)).to.equal(true);
    for (const v of invalid) expect(corrector.validate(v)).to.equal(false);
  });
});

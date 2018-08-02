const expect = require('chai').expect;
const {Schema: correctorSchema} = require('../../../build/dev/nebjs-corrector');   // require('../../../lib/index');
describe('验证器 关键字【properties、patternProperties、additionalProperties】的测试', function () {
  it('{"properties":{"foo":{"type":"string"},"bar":{"type":"number","minimum":2}}} ' +
    '测试： valid: [{}, {"foo": "a"}, {"foo": "a", "bar": 2}], invalid: [{"foo": 1}, {"foo": "a", "bar": 1}]', function () {
    const valid = [{}, {'foo': 'a'}, {'foo': 'a', 'bar': 2}], invalid = [{'foo': 1}, {'foo': 'a', 'bar': 1}];
    const corrector = new correctorSchema({'properties': {'foo': {'type': 'string'}, 'bar': {'type': 'number', 'minimum': 2}}}, {});
    for (const v of valid) expect(corrector.validate(v)).to.equal(true);
    for (const v of invalid) expect(corrector.validate(v)).to.equal(false);
  });
  it('{"patternProperties":{"^fo.*$":{"type":"string"},"^ba.*$":{"type":"number"}}} ' +
    '测试： valid: [{}, {"foo": "a"}, {"foo": "a", "bar": 1}], invalid: [{"foo": 1}, {"foo": "a", "bar": "b"}]', function () {
    const valid = [{}, {'foo': 'a'}, {'foo': 'a', 'bar': 1}], invalid = [{'foo': 1}, {'foo': 'a', 'bar': 'b'}];
    const corrector = new correctorSchema({'patternProperties': {'^fo.*$': {'type': 'string'}, '^ba.*$': {'type': 'number'}}}, {});
    for (const v of valid) expect(corrector.validate(v)).to.equal(true);
    for (const v of invalid) expect(corrector.validate(v)).to.equal(false);
  });
  it('{"properties":{"foo":{"type":"number"}},"patternProperties":{"^.*r$":{"type":"number"}},"additionalProperties":false} ' +
    '测试： valid: [{}, {"foo": 1}, {"foo": 1, "bar": 2}], invalid: [{"a": 3}, {"foo": 1, "baz": 3}]', function () {
    const valid = [{}, {'foo': 1}, {'foo': 1, 'bar': 2}], invalid = [{'a': 3}, {'foo': 1, 'baz': 3}];
    const corrector = new correctorSchema({'properties':{'foo':{'type':'number'}},'patternProperties':{'^.*r$':{'type':'number'}},'additionalProperties':false}, {});
    for (const v of valid) expect(corrector.validate(v)).to.equal(true);
    for (const v of invalid) expect(corrector.validate(v)).to.equal(false);
  });
  it('{"properties":{"foo":{"type":"number"}},"patternProperties":{"^.*r$":{"type":"number"}},"additionalProperties":{"type":"string"}} ' +
    '测试： valid: [{}, {"a": "b"}, {"foo": 1}, {"foo": 1, "bar": 2}, {"foo": 1, "bar": 2, "a": "b"}], invalid: [{"a": 3}, {"foo": 1, "baz": 3}]', function () {
    const valid = [{}, {'a': 'b'}, {'foo': 1}, {'foo': 1, 'bar': 2}, {'foo': 1, 'bar': 2, 'a': 'b'}], invalid = [{'a': 3}, {'foo': 1, 'baz': 3}];
    const corrector = new correctorSchema({'properties':{'foo':{'type':'number'}},'patternProperties':{'^.*r$':{'type':'number'}},'additionalProperties':{'type':'string'}}, {});
    for (const v of valid) expect(corrector.validate(v)).to.equal(true);
    for (const v of invalid) expect(corrector.validate(v)).to.equal(false);
  });
  it('{"properties":{"foo":{"type":"number"}},"additionalProperties":false,"anyOf":[{"properties":{"bar":{"type":"number"}}},{"properties":{"baz":{"type":"number"}}}]} ' +
    '测试： valid: [{}, {"foo": 1}], invalid: [{"bar": 2}, {"baz": 3}, {"foo": 1, "bar": 2}]', function () {
    const valid = [{}, {'foo': 1}], invalid = [{'a': 3}, {'foo': 1, 'baz': 3}];
    const corrector = new correctorSchema({'properties':{'foo':{'type':'number'}},'additionalProperties':false,'anyOf':[{'properties':{'bar':{'type':'number'}}},{'properties':{'baz':{'type':'number'}}}]}, {});
    for (const v of valid) expect(corrector.validate(v)).to.equal(true);
    for (const v of invalid) expect(corrector.validate(v)).to.equal(false);
  });
});

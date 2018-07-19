const expect = require('chai').expect;
const {Schema: ValidatorSchema} = require('../../../build/dev/nebjs-validator');   // require('../../../lib/index');
describe('验证器 关键字【if、then、else】的测试', function () {
  it('{"if":{"properties":{"power":{"minimum":9000}}},"then":{"required":["disbelief"]},"else":{"required":["confidence"]}}' +
    ' 测试： valid: [{"power": 10000, "disbelief": true}, {"power": 1000, "confidence": true}], ' +
    'invalid: [{"power": 10000 }, {"power": 10000, "confidence": true }, {"power": 1000 }]', function () {
    const valid = [{'power': 10000, 'disbelief': true}, {'power': 1000, 'confidence': true}],
      invalid = [{'power': 10000}, {'power': 10000, 'confidence': true}, {'power': 1000}];
    const validator = new ValidatorSchema({'if': {'properties': {'power': {'minimum': 9000}}}, 'then': {'required': ['disbelief']}, 'else': {'required': ['confidence']}}, {});
    for (const v of valid) expect(validator.validate(v)).to.equal(true);
    for (const v of invalid) expect(validator.validate(v)).to.equal(false);
  });
  it('{"type":"integer","minimum":1,"maximum":1000,"if":{"minimum":100},"then":{"multipleOf":100},"else":{"if":{"minimum":10},"then":{"multipleOf":10}}}' +
    ' 测试： valid: [1, 5, 10, 20, 50, 100, 200, 500, 1000], invalid: [-1, 0, 2000, 11, 57, 123]', function () {
    const valid = [1, 5, 10, 20, 50, 100, 200, 500, 1000], invalid = [-1, 0, 2000, 11, 57, 123];
    const validator = new ValidatorSchema({'type':'integer','minimum':1,'maximum':1000,'if':{'minimum':100},'then':{'multipleOf':100},'else':{'if':{'minimum':10},'then':{'multipleOf':10}}}, {});
    for (const v of valid) expect(validator.validate(v)).to.equal(true);
    for (const v of invalid) expect(validator.validate(v)).to.equal(false);
  });
});

const expect = require('chai').expect;
const validator = require('../../lib/index');
describe('validator.Schema.registerKeywords 【注册关键字】测试', function () {
  describe('registerKeywords 输出异常', function () {
    it('registerKeywords 传参错误会异常', function () {
      const reg = validator.Schema.registerKeywords;
      expect(reg.bind(null, [])).to.Throw();
      expect(reg.bind(null, [{}])).to.Throw();
      expect(reg.bind(null, [{name: '  ', types: null}])).to.Throw();
      expect(reg.bind(null, [{name: 'abc', types: null}])).to.Throw();
      expect(reg.bind(null, [{name: 'abc', types: []}])).to.not.Throw();
    });
    it('registerKeywords 重复注册异常', function () {
      const reg = validator.Schema.registerKeywords;
      expect(reg.bind(null, [{name: 'def', types: []}])).to.not.Throw();
      expect(reg.bind(null, [{name: 'def', types: []}])).to.Throw();
    });
  });
});
describe('validator.Schema.getRegisterKeywordsInfo 【注册关键字】测试', function () {
  it('getRegisterKeywordsInfo 获取到注册的def信息', function () {
    const get = validator.Schema.getRegisterKeywordsInfo;
    expect(get('def')).to.not.equal(null);
  });
  it('getRegisterKeywordsInfo 获取到注册的def的配置信息', function () {
    const get = validator.Schema.getRegisterKeywordsInfo;
    expect(get('def', 'option')).to.not.equal(null);
  });
  it('getRegisterKeywordsInfo 获取到注册的def的配置信息中的name为def', function () {
    const get = validator.Schema.getRegisterKeywordsInfo;
    expect(get('def', 'option').name).to.equal('def');
  });
  it('getRegisterKeywordsInfo 获取不到注册的a123信息', function () {
    const get = validator.Schema.getRegisterKeywordsInfo;
    expect(get('a123')).to.equal(null);
  });
});

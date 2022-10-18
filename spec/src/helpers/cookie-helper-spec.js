const { default: CookieHelper } = require('../../../src/helpers/cookie-helper');
const expect = require('chai').expect;

describe("CookieHelper's", () => {
  describe('constructor()', () => {
    it('should always throw an error when called', () => {
      expect(() => new CookieHelper()).to.throw(Error, 'Cannot call Private Constructor!');
    });
  });

  describe('parseCookie()', () => {
    it('should parse a single cookie string into an array of key-value pair', () => {
      expect(CookieHelper.parseCookie('key=value')).to.be.eql(['key', 'value']);
    });

    it('should parse a single cookie string with no value into an array of key-value pair', () => {
      expect(CookieHelper.parseCookie('key')).to.be.eql(['key', undefined]);
    });

    it('should return null if the key is included in USELESS_KEYS set', () => {
      expect(CookieHelper.parseCookie('SameSite=some_value')).to.be.null;
    });

    it('should parse cookie string if there are two cookies in the string (delimitted by comma)');
    it('should parse cookie string if there are two cookies in the string (delimitted by semi-colon)');
    it('should parse cookie string if there are multiple equal to sign in cookie string');
    it('should return null for malformed cookie string');
  });

  describe('insertInMap()', () => {});
});

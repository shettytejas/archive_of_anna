/**
 * This is a class that helps with decoding cookies.
 */
class CookieHelper {
  /**
   * Set of keys which were not necessary to me.
   */
  static #USELESS_KEYS = new Set(['SameSite', 'path', 'secure', 'domain', 'path', 'Max-Age', 'expires', 'language']);

  /**
   * @constructor
   */
  constructor() {
    throw new Error('Cannot call Private Constructor!');
  }

  /**
   * This method parses a single cookie string.
   * A single cookie string should be of pattern: key=value.
   * In case due to some cookie pattern, where some cookies are separated with a comma,
   * there's a recursive retry implemented.
   * For ex. if the singleCookieStr is of pattern key1=value1,key2=value2, the method will
   * call itself recursively to get both the cookie's key value pairs.
   * @param {String} singleCookieStr Cookie String of pattern -> key=value
   * @return {(String[]|null)} Returns [key, value] if parsing is successful, else null.
   */
  static #parseCookie(singleCookieStr) {
    if (singleCookieStr.indexOf('=') == singleCookieStr.lastIndexOf('=')) {
      const [key, value] = singleCookieStr.split('=');
      if (this.#USELESS_KEYS.has(key)) return null;
      return [key, value];
    } else if (singleCookieStr.indexOf(',') > -1) {
      return singleCookieStr.split(/, ?/).map((c) => this.#parseCookie(c));
    } else {
      return null;
    }
  };

  /**
   * Inserts the [key,value] array in the given map as { key: value }.
   * This method recursively calls itself and inserts the key-value pairs if supplied with array of array of strings.
   * @param {String[]} cookieArr Array containing strings or array of strings.
   * @param {Map<String, String>} map The map to insert key value pairs into.
   * @return {void}
   */
  static #insertInMap(cookieArr, map) {
    if (cookieArr === null) return;

    if (typeof cookieArr[0] === 'string') {
      map[cookieArr[0]] = cookieArr[1];
    } else {
      cookieArr.forEach((c) => this.#insertInMap(c, map));
    }
  }

  /**
   * This method parses the entire cookie string from a response header.
   * @param {String} cookieStr The cookie string
   * @return {Map<String, String>} Map of key value pairs.
   */
  static parseCookies(cookieStr) {
    const result = {};
    cookieStr.split(/; ?/).map((c)=> this.#parseCookie(c)).forEach((c) => this.#insertInMap(c, result));
    return result;
  };
}

exports.default = CookieHelper;

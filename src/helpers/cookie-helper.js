class CookieHelper{
  static #USELESS_KEYS = new Set(['SameSite', 'path', 'secure', 'domain', 'path', 'Max-Age', 'expires', 'language'])

  constructor() {
    throw new Error('Cannot call Private Constructor!');
  }

  
  static #parseCookie = (single_cookie_str = "") => {
    if (single_cookie_str.indexOf('=') == single_cookie_str.lastIndexOf('=')) {
      let [key, value] = single_cookie_str.split('=');

      if (CookieHelper.#USELESS_KEYS.has(key))
        return null;
      
      return [key, value]
    }
    else if (single_cookie_str.indexOf(',') > -1)
      return single_cookie_str.split(/, ?/).map(c => CookieHelper.#parseCookie(c));
    else
      return null;
  }

  static #insertInMap(cookie_arr, map) {
    if (cookie_arr === null)
      return;
    if (typeof cookie_arr[0] === 'string')
      map[cookie_arr[0]] = cookie_arr[1]
    else
      cookie_arr.forEach(c => CookieHelper.#insertInMap(c, map))
  }

  static parseCookies = (cookie_str) => {
    const result = {};
    
    cookie_str.split(/; ?/).map(c=> CookieHelper.#parseCookie(c)).forEach((c) => CookieHelper.#insertInMap(c, result));
    
    return result;
  }
}
 
exports.default = CookieHelper
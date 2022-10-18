/**
 * The API wrapper of ZLibrary.
 * This is a singleton class and should already be instantiated on require.
 * If not, use the initialize() method to instantiate a singleton instance.
 *
 * If the singleton is not instantiated, all the methods called will return undefined.
 */
class ZLibrary {
// Required Libraries
  #axios = require('axios');
  #cookie_helper = require('../helpers/cookie-helper').default;

  // Singleton-Specific Static Variables Used.
  /**
  * This variable will hold the instance object of the class.
  * @type {ZLibrary}
  */
  static #instance;

  /**
   * This variable specifies whether or not the constructor can instantiate a new object.
   * @type {Boolean}
   */
  static #initialisingDisallowed = true;

  // Constant Variables

  /**
   * The base URI used to connect to ZLibrary.
   */
  static ZLIB_BASE_URI = 'https://1lib.in';
  /**
   * The URI used to login a user.
   */
  static LOGIN_URI = 'https://singlelogin.app/rpc.php';
  /**
   * The request headers with a valid client. Without this, the URIs respond with a "Client Denied" message.
   */
  static REQ_HEADERS = { 'User-Agent': 'PostmanRuntime/7.29.2' };

  // Instance Variables

  /**
   * This variable contains the logged in user's cookies.
   */
  #cookieJar;


  // Constructor

  /**
   * @constructor
   */
  constructor() {
    if (ZLibrary.#initialisingDisallowed) {
      throw new Error('Initialising of a singleton is not allowed. Please use the initialize() method!');
    }

    ZLibrary.#initialisingDisallowed = true;
  }

  // Public Static Methods

  /**
   * The method is used to initialize the instance of the singleton.
   */
  static initialize() {
    if (this.isInstansiated()) return;

    this.#initialisingDisallowed = false;
    this.#instance = new this;
  }

  /**
   * This method is used to log in the user into ZLibrary.
   * @param {String} email Email of the User
   * @param {String} password Password of the User
   * @return {Boolean} True if the user has successfully logged in, else false.
   */
  static login(email, password) {
    return this.#instance.login(email, password);
  }

  /**
   * This method is used to check whether the class is instantiated.
   * @return {Boolean} True if the class is instantiated, else false.
   */
  static isInstansiated() {
    return !!this.#instance;
  }

  // Instance Methods

  /**
   * This is the instance method which is used to log in the user into ZLibrary.
   * @param {String} email Email of the User
   * @param {String} password Password of the User
   * @return {Boolean} True if the user has successfully logged in, else false.
   */
  async login(email, password) {
    const data = {
      'isModal': true,
      'email': email,
      'password': password,
      'site_mode': 'books',
      'action': 'login',
      'isSingleLogin': 1,
      'redirectUrl': '',
      'gg_json_mode': 1,
    };


    const response = await this.#axios.post(ZLibrary.LOGIN_URI, null, { headers: ZLibrary.REQ_HEADERS, params: data });
    const serializedCookies = response.headers['set-cookie'];

    this.#cookieJar = this.#cookie_helper.parseCookies(serializedCookies);
    const isLogInFailure = !(this.#cookieJar['remix_userid'] && this.#cookieJar['remix_userkey']);

    if (isLogInFailure) this.#clearCookieJar();

    return this.isUserLoggedIn();
  }

  /**
   * This instance method logs out the user.
   */
  logout() {
    this.#clearCookieJar();
  }

  /**
   * Checks if the user is logged in.
   * @return {Boolean} True if the user's logged in (cookie data is present), else false.
   */
  isUserLoggedIn() {
    return !!(this.#cookieJar);
  }

  // Private Instance Methods

  /**
   * Clears the cookie data.
   */
  #clearCookieJar() {
    this.#cookieJar = null;
  }
}

exports.default = ZLibrary;

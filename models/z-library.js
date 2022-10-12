class ZLibrary {
	// Required Libraries
	#axios = require('axios');
	#cookie_helper = require('../helpers/cookie-helper').default;

	// Singleton-Specific Static Variables Used.
	/** 
	*	@type {ZLibrary}
	*/
	static #instance;
	static #initialisingDisallowed = true;

	// Constant Variables
	static ZLIB_BASE_URI = 'https://1lib.in';
	static LOGIN_URI = 'https://singlelogin.app/rpc.php'
	static REQ_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36'
}
	
	// Instance Variables
	#cookieJar;


	// Constructor
	
	constructor() {
		if (ZLibrary.#initialisingDisallowed) {
			throw new Error("Initialising of a singleton is not allowed. Please use the getOrCreateInstance() method!")
		}

		ZLibrary.#initialisingDisallowed = true;
	}

	// Public Static Methods
	static getOrCreateInstance() {
		if (ZLibrary.#isInstanceAbsent()) {
			ZLibrary.#initialisingDisallowed = false;
			ZLibrary.#instance = new this
		}
	}

  static login(email, password) {
		return ZLibrary.#instance.login(email, password);
	}

	// Private Static Methods

	static #isInstanceAbsent() {
		return !ZLibrary.#instance;
	}

	// Instance Methods
	async login(email, password) {
		const data = {
			"isModal": true,
			"email": email,
			"password": password,
			"site_mode": "books",
			"action": "login",
			"isSingleLogin": 1,
			"redirectUrl": "",
			"gg_json_mode": 1
		};


		const response = await this.#axios.post(ZLibrary.LOGIN_URI, null, { headers: ZLibrary.REQ_HEADERS, params: data });
		const serializedCookies = response.headers["set-cookie"];

		this.#cookieJar = this.#cookie_helper.parseCookies(serializedCookies);
		const isLogInFailure = !(this.#cookieJar['remix_userid'] && this.#cookieJar['remix_userkey'])

		if (isLogInFailure) this.#clearCookieJar();

		return this.isUserLoggedIn();
	}

	logout() {
		this.#clearCookieJar();
		return true;
	}

	isUserLoggedIn() {
		return !!(this.#cookieJar);
	}

	// Private Instance Methods

	#clearCookieJar() {
		this.#cookieJar = null;
	}
}

exports.default = ZLibrary;
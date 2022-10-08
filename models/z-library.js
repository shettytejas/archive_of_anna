class ZLibrary {
	// Required Libraries
	#axios = require('axios');

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
	#cookie_jar;


	// Constructor
	
	constructor() {
		if (ZLibrary.#initialisingDisallowed) {
			throw new Error("Initialising of a singleton is not allowed. Please use the getOrCreateInstance() method!")
		}

		ZLibrary.#initialisingDisallowed = true;
	}

	// Public Static Methods
	static getOrCreateInstance() {
		if (ZLibrary.#isInstanceAbsent) {
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
	login(email, password) {
		const data = {
			"isModal": true,
			"email": email,
			"password": password,
			"site_mode": "books",
			"action": "login",
			"isSingleLogin": 1,
			"redirectUrl": "",
			"gg_json_mode": 1
		}


		const response = this.#axios.post(ZLibrary.LOGIN_URI, null, { headers: ZLibrary.REQ_HEADERS, params: data });
		this.#cookie_jar = response;
		
		// TODO: Complete this function for three scenarios: successful log-in, unsuccessful log-in, and errors.
		// TODO: PS - Status code doesn't work. Bad wiring by ZLibrary guys xD.
		return this.#cookie_jar;
	}
}

exports.default = ZLibrary;
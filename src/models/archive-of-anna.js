const MinContent = require('./min-content');

/**
 * The API wrapper of Anna's Archive.
 */
class ArchiveOfAnna {
  // Required Libraries
  static #axios = require('axios');
  static #cheerio = require('cheerio');

  // Constant Variables

  /**
   * The base URI used to connect to Anna's Archive.
   */
  static AA_BASE_URI = 'https://annas-archive.org';

  /**
   * @constructor
   */
  constructor() {
    throw new Error('Initialising of this class is not allowed.');
  }

  /**
   * It searches for a given text in Anna's Archive.
   * @param {String} text - The text to search for.
   * @param {String} [lang] - The language of the content you want to search for.
   * @param {String} [content] - The type of content you want to search for.
   * @param {String} [ext] - The file extension you wamt to sarch for.
   * @param {String} [sort] - The order you want the search results to be in.
   * @return {Object[]} - The collection of items returned based on your search. // TODO: Pending proper documentation.
   */
  static async search(text, lang = '', content = '', ext = '', sort = '') {
    const url = this.#buildSearchUrl(text, lang, content, ext, sort);
    const response = await this.#axios.get(url);
    return this.#collectMinContent(response);
  }

  /**
   * It fetches the content of a given path from the AA API
   * @param {String} path - The path to the content you want to fetch.
   * TODO: Fix Documentation
   */
  static async fetch(path) {
    if (!path.startsWith(MinContent.PATH_PREFIX)) path = MinContent.PATH_PREFIX + path;

    const url = this.AA_BASE_URI + path;
    const response = await this.#axios.get(url);

    return response; // TODO: Pending
  }

  // Private Static Methods

  /**
   * It takes in a bunch of parameters and returns a URL object with those parameters set
   * @param {String} query - The search query.
   * @param {String} lang - The language of the search results.
   * @param {String} content - The type of content to search for. Can be one of:
   * @param {String} ext - The file extension to search for.
   * @param {String} sort - The sort order of the results.
   * @return {URL} A URL object with the search parameters set.
   */
  static #buildSearchUrl(query, lang, content, ext, sort) {
    const url = new URL(this.AA_BASE_URI + '/search');

    url.searchParams.set('q', query);
    url.searchParams.set('lang', lang);
    url.searchParams.set('content', content);
    url.searchParams.set('ext', ext);
    url.searchParams.set('sort', sort);

    return url;
  }

  /**
   * > The function takes in a response from a search request, removes the comments from the HTML data,
   * loads the HTML into Cheerio, and then returns an array of objects containing the required data from the search results.
   * @param {Object} searchResponse - The response from the search request.
   * @return {Object[]} An array of objects.
   */
  static #collectMinContent(searchResponse) {
    const htmlData = searchResponse.data.replace(/(<!--|-->)/g, '');
    const $ = this.#cheerio.load(htmlData);
    const collection = [];

    $('[id^=link-index-]').each((_, el) => collection.push(MinContent.new($(el))));

    return collection;
  }

  /**
   * `#buildFullContent` takes a `fetchResponse` and returns a `Promise` that resolves to a `String` containing the full content of the page
   * @param {Object} fetchResponse - The response from the fetch request.
   * TODO: Fix Documentation
   */
  static #buildFullContent(fetchResponse) {
    // TODO: Build full content with the download links.
  }
}

module.exports = ArchiveOfAnna;

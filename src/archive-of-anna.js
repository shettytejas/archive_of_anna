// Helpers
const searchHelper = require('./helpers/search-helper');

// Libraries
const axiosHelper = require('./libraries/axios-helper');

/**
 * The API wrapper of Anna's Archive.
 */
class ArchiveOfAnna {
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
   * @return {Object[]} - The collection of items returned based on your search.
   * TODO: Fix documentation.
   */
  static async search(text, lang = '', content = '', ext = '', sort = '') {
    const url = searchHelper.buildSearchUrl(text, lang, content, ext, sort);
    const response = await axiosHelper.get(url);
    return searchHelper.collectContents(response.data);
  }

  /**
   * It fetches the content of a given path from the Anna's Archive API
   * @param {String} path - The id or prefixed path to the content you want to fetch.
   * TODO: Fix Documentation
   */
  static async fetch(path) {
    const url = searchHelper.buildFetchUrl(path);
    const response = await axiosHelper.get(url);
    return searchHelper.getContent(response.data); // TODO: Pending
  }
}

module.exports = ArchiveOfAnna;

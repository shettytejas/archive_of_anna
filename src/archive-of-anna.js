// Helpers
const { DOWNLOAD_PATH } = require('./constants');
const downloadHelper = require('./helpers/download-helper');
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
   * It takes a md5 hash, builds a url, makes a request to that url, and returns the content of the response
   * @param {String} md5 - The md5 hash of the file you want to search for. You can get this from search.
   * @return {Object} The content of the response.
   * TODO: Fix documentation.
   */
  static async fetchByMd5(md5) {
    const url = searchHelper.buildFetchUrl(md5);
    const response = await axiosHelper.get(url);
    return searchHelper.getContent(response.data);
  }

  /**
   * It takes an array of IPFS links and returns a promise that resolves to an array of the same length,
   * where each element is the file contents of the corresponding IPFS link
   * @param {Array} ipfsLinks - An array of IPFS links.
   * @param {String|undefined} name - Name for the file to be saved as.
   * @param {String} path - Path to save the file to.
   * @return {File} the result of the downloadHelper.ipfs function.
   * TODO: Fix Documentation.
   */
  static downloadFileViaIpfs(ipfsLinks, name = undefined, path = DOWNLOAD_PATH) {
    return downloadHelper.ipfs(ipfsLinks, name, path);
  }

  /**
   * It takes a list of links to Libgen, and downloads the files
   * @param {Array} libgenLinks - An array of links to the libgen mirrors.
   * @param {String|undefined} fork - The fork to download the file from.
   * @param {String|undefined} name - Name for the file to be saved as.
   * @param {String} path - Path to save the file to.
   * @return {File} A promise.
   * TODO: Fix Documentation
   */
  static downloadFileViaLibgen(libgenLinks, fork = undefined, name = undefined, path = DOWNLOAD_PATH) {
    return downloadHelper.libgenDownload(libgenLinks, fork, name, path);
  }
}

module.exports = ArchiveOfAnna;

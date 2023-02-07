const { CONTENT_PATH_PREFIX } = require('../constants');
const cheerio = require('../libraries/cheerio-helper');
const searchContent = require('../models/search-content');

const searchHelper = {
  /**
   * It takes in a bunch of parameters and returns a URL object with those parameters set
   * @param {String} baseUri - The base URI.
   * @param {String} query - The search query.
   * @param {String} lang - The language of the search results.
   * @param {String} content - The type of content to search for. Can be one of:
   * @param {String} ext - The file extension to search for.
   * @param {String} sort - The sort order of the results.
   * @return {URL} A URL object with the search parameters set.
   */
  buildSearchUrl: (baseUri, query, lang, content, ext, sort) => {
    const url = new URL(baseUri + '/search');

    url.searchParams.set('q', query);
    url.searchParams.set('lang', lang);
    url.searchParams.set('content', content);
    url.searchParams.set('ext', ext);
    url.searchParams.set('sort', sort);

    return url;
  },
  /**
   * > The function takes in a response from a search request, removes the comments from the HTML data,
   * loads the HTML into Cheerio, and then returns an array of objects containing the required data from the search results.
   * @param {Object} searchResponse - The response from the search request.
   * @return {Object[]} An array of objects.
   */
  collectContents: (searchResponse) => {
    // Remove comment identifiers. Used for client-side pagination by the website while loading content.
    const htmlData = searchResponse.data.replace(/(<!--|-->)/g, '');
    const $ = cheerio.load(htmlData);
    const collection = [];

    // Go through each search result (200 results) and map them to searchContent model, and add it into collection array.
    $('[id^=link-index-]').each((_, el) => collection.push(searchContent($(el))));

    return collection;
  },
  /**
   * It takes in a bunch of parameters and returns a URL object with those parameters set
   * @param {String} baseUri - The base URI.
   * @param {String} id - The content id to be fetched.
   * @return {URL} A URL object with the formed url.
   */
  buildFetchUrl: (baseUri, id) => {
    let path = id;

    if (!path.startsWith(CONTENT_PATH_PREFIX)) path = CONTENT_PATH_PREFIX + path;

    return new URL(baseUri + path);
  },
  getContent: (fetchResponse) => {}, // TODO: Pending
};

module.exports = searchHelper;

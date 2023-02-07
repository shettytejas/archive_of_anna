const { BASE_URI, MD5_PREFIX } = require('../constants');
const cheerio = require('../libraries/cheerio-helper');
const fetchContent = require('../models/fetch-content');
const searchContent = require('../models/search-content');

const searchHelper = {
  /**
   * It takes in a bunch of parameters and returns a URL object with those parameters set
   * @param {String} query - The search query.
   * @param {String} lang - The language of the search results.
   * @param {String} content - The type of content to search for. Can be one of:
   * @param {String} ext - The file extension to search for.
   * @param {String} sort - The sort order of the results.
   * @return {URL} A URL object with the search parameters set.
   */
  buildSearchUrl: (query, lang, content, ext, sort) => {
    const url = new URL(BASE_URI + '/search');

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
   * @param {Object} searchResponseHtml - The response from the search request.
   * @return {Object[]} An array of objects.
   */
  collectContents: (searchResponseHtml) => {
    // Remove comment identifiers. Used for client-side pagination by the website while loading content.
    const htmlData = searchResponseHtml.replace(/(<!--|-->)/g, '');
    const $ = cheerio.load(htmlData);
    const collection = [];

    // Go through each search result (200 results) and map them to searchContent model, and add it into collection array.
    $('[id^=link-index-]').each((_, el) => collection.push(searchContent($(el))));

    return collection;
  },
  /**
   * It takes in a bunch of parameters and returns a URL object with those parameters set
   * @param {String} md5Path - The content md5 or prefixed md5 to be fetched.
   * @return {URL} A URL object with the formed url.
   */
  buildFetchUrl: (md5Path) => {
    let path = md5Path;

    // TODO: Search results only show MD5 links for now (ref. https://annas-archive.org/datasets#files). This might change in future!!!
    if (!path.startsWith(MD5_PREFIX)) path = MD5_PREFIX + path;

    return new URL(BASE_URI + path);
  },
  getContent: (fetchResponse) => {
    const htmlData = fetchResponse;
    const $ = cheerio.load(htmlData);
    return fetchContent($('main'));
  },
};

module.exports = searchHelper;

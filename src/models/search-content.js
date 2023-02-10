const {
  PATH_PREFIXES: { MD5 },
} = require('../constants');

// TODO: Better handling of Mapper required?
/**
 * It takes a Cheerio object loaded with a single search result, and returns an object containing the information about that search result
 * @param {Cheerio<Element>} loadedElement - The element that was loaded.
 * @return {Object} An object with the following properties:
 *   authors: An array of authors
 *   coverUrl: The URL of the cover image
 *   md5: The MD5 hash of the content
 *   title: The title of the content
 */
const searchContent = (loadedElement) => {
  // TODO: Search results only show MD5 links for now (ref. https://annas-archive.org/datasets#files). This might change in future!!!
  return {
    authors: loadedElement.find('.truncate.italic').text(),
    coverUrl: loadedElement.find('img').attr('src'),
    md5: loadedElement.find('a').attr('href').replace(MD5, ''),
    title: loadedElement.find('h3').text(),
  };
};

module.exports = searchContent;

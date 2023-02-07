const { CONTENT_PATH_PREFIX } = require('../constants');

/**
 * It takes a Cbeerio object loaded with a single search result, and returns an object containing the information about that search result
 * @param {Cheerio<Element>} loadedElement - The element that was loaded.
 * @return {Object} An object with the following properties:
 *   authors: An array of authors
 *   coverUrl: The URL of the cover image
 *   id: The ID of the content
 *   path: The path to the content
 *   name: The name of the content
 */
const searchContent = (loadedElement) => {
  const fullContentPath = loadedElement.find('a').attr('href');
  const coverUrl = loadedElement.find('img').attr('src');
  const authors = loadedElement.find('.truncate.italic').text().split(/, ?/); // TODO: Better Author Name Detection
  const contentName = loadedElement.find('h3').text();

  return {
    authors: authors,
    coverUrl: coverUrl,
    id: fullContentPath.replace(CONTENT_PATH_PREFIX, ''),
    path: fullContentPath,
    name: contentName,
    // TODO: Publisher Details Detection
  };
};

module.exports = searchContent;

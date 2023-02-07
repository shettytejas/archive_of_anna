const { MD5_PREFIX } = require('../constants');

const authors = (fileUnifiedData) => {
  const authors = [...fileUnifiedData.author_additional];

  if (authors.length == 0) authors.push(fileUnifiedData.author_best);

  return authors;
};

const coverUrl = (fileUnifiedData) => fileUnifiedData.cover_url_best;

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
const fetchContent = (loadedElement) => {
  const rawMetadata = loadedElement.find('.js-technical-details.hidden>div>div:last-child').text();
  const jsonMetadata = JSON.parse(rawMetadata.replace(/\s{2,}/g, ''));

  const fileUnifiedData = jsonMetadata.file_unified_data;

  return {
    authors: authors(fileUnifiedData),
    coverUrl: coverUrl(fileUnifiedData),
    // TODO: Search results only show MD5 links for now (ref. https://annas-archive.org/datasets#files). This might change in future!!!
    md5: fullContentPath.replace(MD5_PREFIX, ''),
    name: contentName,
    // TODO: Publisher Details Detection
  };
};

module.exports = fetchContent;

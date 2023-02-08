// TODO: Better handling of Mapper.
const mapper = (jsonMetadata) => {
  const fileUnifiedData = jsonMetadata.file_unified_data;
  const authors = (fileUnifiedData) => {
    const authors = [...fileUnifiedData.author_additional];
    if (authors.length == 0) authors.push(fileUnifiedData.author_best);

    return authors;
  };

  return {
    authors: authors(fileUnifiedData),
    coverUrl: fileUnifiedData.cover_url_best,
    description: fileUnifiedData.stripped_description_best,
    downloadLinks: [], // TODO: Pending
    extension: fileUnifiedData.extension_best,
    isbnCodes: fileUnifiedData.sanitized_isbns,
    md5: jsonMetadata.md5,
    publisher: fileUnifiedData.publisher_best,
    title: fileUnifiedData.title_best,
    year: parseInt(fileUnifiedData.year_best),
  };
};

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
  return mapper(jsonMetadata);
};

module.exports = fetchContent;

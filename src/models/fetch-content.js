// TODO: Better handling of Mapper required?
const mapper = (jsonMetadata) => {
  const fileUnifiedData = jsonMetadata.file_unified_data;

  const authors = (() => {
    const result = [...fileUnifiedData.author_additional];
    if (result.length == 0) result.push(fileUnifiedData.author_best);

    return result;
  })();

  const downloadLinks = (() => {
    const result = {
      libgenRsFork: [],
      libgenLiFork: [],
      ipfs: [],
      zLibTor: [],
    };

    jsonMetadata.additional.download_urls.forEach((urlObject) => {
      const [name, url] = urlObject;
      let array = undefined;

      if (name.includes('.rs-fork')) array = result.libgenRsFork;
      else if (name.includes('.li-fork')) array = result.libgenLiFork;
      else if (name.includes('IPFS')) array = result.ipfs;
      else if (name.includes('Z-Library TOR')) array = result.zLibTor;

      if (array !== undefined) array.push(url);
    });

    return result;
  })();

  const year = parseInt(fileUnifiedData.year_best);

  return {
    authors: authors,
    coverUrl: fileUnifiedData.cover_url_best,
    description: fileUnifiedData.stripped_description_best,
    downloadLinks: downloadLinks,
    extension: fileUnifiedData.extension_best,
    isbnCodes: fileUnifiedData.sanitized_isbns,
    md5: jsonMetadata.md5,
    publisher: fileUnifiedData.publisher_best,
    title: fileUnifiedData.title_best,
    year: year,
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

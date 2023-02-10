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
 * It takes a Cheerio object loaded with a content result, and returns an object containing the detailed information about that content.
 * @param {Cheerio<Element>} loadedElement - The cheerio element that was loaded scraped from the request.
 * @return {Object} An object with the following properties:
 *   authors: An array of authors
 *   coverUrl: The URL of the cover image
 *   description: The sanitised description of the content
 *   downloadLinks: The segregated download links of the content
 *   extension: The extension of the content the download links provide.
 *   isbnCodes: The sanitised ISBN codes of the content (if the content is a book?) // TODO: Check if correct?
 *   md5L The MD5 hash of the content
 *   publisher: The publisher of the content
 *   title: The title of the content
 *   year: The year of publish? for the content // TODO: Check if correct?
 */
const fetchContent = (loadedElement) => {
  const rawMetadata = loadedElement.find('.js-technical-details.hidden>div>div:last-child').text();
  const jsonMetadata = JSON.parse(rawMetadata.replace(/\s{2,}/g, ''));
  return mapper(jsonMetadata);
};

module.exports = fetchContent;

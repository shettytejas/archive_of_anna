const axiosHelper = require('../libraries/axios-helper');
const fileHelper = require('../libraries/file-helper');

const getSubstringIndicesForFilename = (contentDispositionHeader) => {
  const filenameHeader = 'filename="';
  const startIndex = contentDispositionHeader.indexOf(filenameHeader) + filenameHeader.length;
  const endIndex = contentDispositionHeader.indexOf('"', startIndex);

  return [startIndex, endIndex];
};

const getFileNameFromHeaders = (response) => {
  const contentDispositionHeader = response.headers['content-disposition'];
  const [startIndex, endIndex] = getSubstringIndicesForFilename(contentDispositionHeader);

  return contentDispositionHeader.substring(startIndex, endIndex);
};

const getFileExtensionFromHeaders = (response) => {
  const fileName = getFileNameFromHeaders(response);
  return fileName.substring(fileName.lastIndexOf('.') + 1);
};

const getCustomFileName = (name) => `${name}.${getFileExtensionFromHeaders(response)}`;

const getFileNameAndContent = async (name, link) => {
  const response = await axiosHelper.download(link, name);
  if (response.status != 200) return [null, null];

  const fileName = name ? getCustomFileName(name) : getFileNameFromHeaders(response);

  return [fileName, response.data];
};

const downloadFileFromGivenLinks = async (links, name, path) => {
  fileHelper.directorySetup(path); // Setup the download directory if it doesn't exist.

  for (const link of links) {
    const [fileName, content] = await getFileNameAndContent(name, link);

    if (!content) continue;

    return await fileHelper.writeFileToPath(path, fileName, content);
  }

  throw new Error('File could not be downloaded due to server error. Please try again later.');
};

const downloadHelper = {
  ipfs: async (ipfsLinks, name, path) => await downloadFileFromGivenLinks(ipfsLinks, name, path),
  libgenDownload: (libgenLinks, fork, name, path) => {},
  torDownload: () => {}, // TODO: Not in current scope. Need to check if axios can be self-contained for Tor requests.
};

module.exports = downloadHelper;

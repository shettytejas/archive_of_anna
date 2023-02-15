const { DOWNLOAD_PATH } = require('../constants');
const axiosHelper = require('../libraries/axios-helper');
const fsHelper = require('../libraries/file-helper');

const FILENAME_HEADER = 'filename="';

const downloader = async (link) => {
  const result = [null, null];
  try {
    const response = await axiosHelper.download(link);

    if (response.status != 200) return [null, null];

    const contentDispositionHeader = response.headers['content-disposition'];
    const fileNameIndex = contentDispositionHeader.indexOf(FILENAME_HEADER) + FILENAME_HEADER.length;
    const fileName = contentDispositionHeader.substring(fileNameIndex, contentDispositionHeader.indexOf('"', fileNameIndex));

    [result[0], result[1]] = [fileName, response.data];
  } catch (error) {
    console.log(error);
  }

  return result;
};

const downloadFile = async (links, path = DOWNLOAD_PATH) => {
  for (const link of links) {
    const [fileName, content] = await downloader(link);

    if (!fileName) continue;

    const file = fsHelper.writeFileToPath(path, fileName, content);

    return file; // TODO: Check if await is needed?
  }

  throw new Error('File could not be downloaded due to an unknown error. Please try again later.');
};

const downloadHelper = {
  ipfs: async (ipfsLinks) => {
    return await downloadFile(ipfsLinks);
  },
  libgenDownload: (libgenLinks, fork) => {},
  torDownload: () => {}, // TODO: Not in current scope. Need to check if axios can be self-contained for Tor requests.
};

module.exports = downloadHelper;

const axiosHelper = require('../libraries/axios-helper');

const downloadCallback = async (link) => {
  const response = await axiosHelper.download(link);

  console.log('debug');
};

const downloadHelper = {
  ipfs: (ipfsLinks) => {
    downloadCallback(ipfsLinks[0]);
  },
  libgenDownload: (libgenLinks, fork) => {},
  torDownload: () => {}, // TODO: Not in current scope. Need to check if axios can be self-contained for Tor requests.
};

module.exports = downloadHelper;

const axios = require('axios');
const { getProgress, setProgress } = require('../interface/download-progress');

const headers = { 'User-Agent': 'PostmanRuntime/7.30.0' };

const axiosHelper = {
  get: (url) => axios.get(url, { headers: headers }),
  download: (url, name = undefined) => {
    const downloadProgressKey = name || url;

    return axios.get(url, {
      headers: headers,
      responseType: 'stream',
      onDownloadProgress: (progressEvent) => {
        setProgress(downloadProgressKey, progressEvent);
        console.log('Current Progress: ' + getProgress(downloadProgressKey) + '%'); // TODO: Remove this console log after setting up hooks.
      },
    });
  },
};

module.exports = axiosHelper;

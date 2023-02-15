const axios = require('axios');
const { getProgress, setProgress } = require('../interface/download-progress');

const headers = { 'User-Agent': 'PostmanRuntime/7.30.0' };

const axiosHelper = {
  get: (url) => axios.get(url, { headers: headers }),
  download: (url) =>
    axios.get(url, {
      headers: headers,
      responseType: 'stream',
      onDownloadProgress: (progressEvent) => {
        setProgress('test', progressEvent);
        console.log('Current Progress: ' + getProgress('test') + '%');
      },
    }),
};

module.exports = axiosHelper;

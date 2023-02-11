const axios = require('axios');

const headers = { 'User-Agent': 'PostmanRuntime/7.30.0' };

const axiosHelper = {
  get: (url) => axios.get(url, { headers: headers }),
  download: (url) =>
    axios.get(url, {
      maxContentLength: Infinity,
      headers: headers,
      responseType: 'arraybuffer',
      onDownloadProgress: (progressEvent) => {
        setProgress('test', progressEvent);
        console.log('Current Progress: ' + getProgress('test') + '%');
      },
    }),
};

module.exports = axiosHelper;

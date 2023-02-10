const axios = require('axios');

const axiosHelper = {
  get: (url) => axios.get(url, { headers: { 'User-Agent': 'PostmanRuntime/7.30.0' } }),
};

module.exports = axiosHelper;

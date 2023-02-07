const axios = require('axios');

const axiosHelper = {
  get: (url) => axios.get(url),
};

module.exports = axiosHelper;

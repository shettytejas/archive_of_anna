const store = require('../store');

module.exports = {
  getProgress: (key) => store.downloadProgress[key],
  setProgress: (key, progressEvent) => {
    store.downloadProgress[key] = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
  },
};

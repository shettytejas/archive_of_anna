const store = require('../store');

module.exports = {
  getProgress: (key) => store.downloadProgress[key],
  setProgress: (key, progressEvent) => {
    const percent = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
    store.downloadProgress[key] = percent;
  },
};

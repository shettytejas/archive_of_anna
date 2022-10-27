(async () => {
  const ZLibrary = require('./src/models/z-library');

  ZLibrary.initialize();

  module.exports = ZLibrary;
})();

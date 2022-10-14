(async () => {
  const { default: zLibrary } = require('./src/models/z-library');

  zLibrary.initialize();

  exports.default = zLibrary;
})();

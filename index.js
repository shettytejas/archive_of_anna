(async () => {
  const { default: zLibrary } = require('./src/models/z-library');

  zLibrary.getOrCreateInstance();

  exports.default = zLibrary
})()
(async () => {
  const { default: zLibrary } = require('./models/z-library');

  zLibrary.getOrCreateInstance();

  exports.default = zLibrary
})()
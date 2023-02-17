const fs = require('fs');
const util = require('util');
const stream = require('stream');
const pipeline = util.promisify(stream.pipeline);
const nodePath = require('path');

// ? Do I need this as a helper method across the library?
const pathJoiner = (...paths) => nodePath.join(...paths);

const fileHelper = {
  writeFileToPath: async (path, fileName, content) => {
    const writeTo = pathJoiner(path, fileName);
    const writer = fs.createWriteStream(writeTo);

    await pipeline(content, writer);

    return fs.existsSync(writeTo);
  },
  directorySetup: (path) => {
    fs.existsSync(path) || fs.mkdirSync(path, { recursive: true });
  },
};

module.exports = fileHelper;

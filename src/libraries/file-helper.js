const fs = require('fs');

const fsHelper = {
  writeFileToPath: (path, fileName, content) => {
    const writer = fs.createWriteStream(path + fileName);

    content.pipe(writer); // Starts Writing content

    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        writer.close(resolve);
      });
      writer.on('error', reject);
    });
  },
};

// TODO: Check for the returned Promise on how it resolves or rejects.

module.exports = fsHelper;

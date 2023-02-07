const cheerio = require('cheerio');

const cheerioHelper = {
  load: (htmlData) => cheerio.load(htmlData),
};

module.exports = cheerioHelper;

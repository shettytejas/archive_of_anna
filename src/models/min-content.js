const ArchiveOfAnna = require('./archive-of-anna');

/** MinContent Class
 * TODO: Fix The Documentation!
 */
class MinContent {
  // Constant Variables

  /**
   * The path prefix used for content search.
   */
  static PATH_PREFIX = '/md5/';

  /**
   * It takes a cheerio element, and returns a new Book object with the data from the cheerio element
   * @param {Cheerio<Element>} loadedElement - The cheerio element that was loaded from the page.
   */
  constructor(loadedElement) {
    this.authors = loadedElement.find('.truncate.italic').text().split(/, ?/);
    this.coverUrl = loadedElement.find('img').attr('src');
    this.path = loadedElement.find('a').attr('href');
    this.name = loadedElement.find('h3').text();

    this.id = this.path.replace(MinContent.PATH_PREFIX, '');
    // TODO: Publisher details
  }

  /**
   * The authors getter function returns the value of the authors property.
   * @return {String[]} The authors array.
   */
  get authors() {
    return this.authors;
  }

  /**
   * It returns the coverUrl.
   * @return {String} The coverUrl property of the object.
   */
  get coverUrl() {
    return this.coverUrl;
  }

  /**
   * The function returns the value of the id property
   * @return {String} The id property of the object.
   */
  get id() {
    return this.id;
  }

  /**
   * The function returns the value of the path property
   * @return {String} The path property of the object.
   */
  get path() {
    return this.path;
  }

  /**
   * It returns the full path of the current page
   * @return {String} The full path of the file.
   */
  get fullPath() {
    return ArchiveOfAnna.AA_BASE_URI + this.path;
  }

  /**
   * The getter function is called when the property is accessed
   * @return {String} The name property of the object.
   */
  get name() {
    return this.name;
  }
}

module.exports = MinContent;

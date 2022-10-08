(async ()=>{const { default: zLibrary } = require('./models/z-library');

zLibrary.getOrCreateInstance();

// TODO: Remove Test Code!

res = await zLibrary.login('tshetty.06@hotmail.com', 'TeJaS.0612');
console.log(res);

exports.default = zLibrary})()
// allow only .js files to prevent
// accidental inclusion of other file types

let path = require('path');

module.exports = name => /(\.(js)$)/i.test(path.extname(name));

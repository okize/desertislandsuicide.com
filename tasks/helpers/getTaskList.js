// returns a filtered list of all the scripts in tasks dir (js only)
let fs = require('fs');
let path = require('path');
let config = require('../../gulpconfig');

const isJavascriptFile = name => /(\.(js)$)/i.test(path.extname(name));

module.exports = () => fs.readdirSync(config.gulp.src).filter(isJavascriptFile);

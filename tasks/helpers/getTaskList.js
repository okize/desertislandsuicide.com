// returns a filtered list of all the scripts in tasks dir (js only)
const fs = require('fs');
const path = require('path');
const config = require('../../gulpconfig');

const isJavascriptFile = name => /(\.(js)$)/i.test(path.extname(name));

module.exports = () => fs.readdirSync(config.gulp.src).filter(isJavascriptFile);

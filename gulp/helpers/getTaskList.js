// returns a filtered list of all the scripts in tasks dir (js only)

let fs = require('fs');
let config = require('../../gulpconfig');
let isScript = require('../helpers/isScript');

module.exports = () => fs.readdirSync(config.gulp.src).filter(isScript);

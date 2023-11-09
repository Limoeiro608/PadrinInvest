var fs = require('fs');
module.exports.getTemplate = (v) => {
    return fs.readFileSync(__dirname+`/${v}.html`, { encoding: 'utf8'});
}
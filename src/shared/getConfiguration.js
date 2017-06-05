const fs = require("fs");

module.exports = (path, encode = 'utf8') => JSON.parse(fs.readFileSync(path, encode));

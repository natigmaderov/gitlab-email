const fs = require('fs');

const emailLists = JSON.parse(fs.readFileSync('emailLists.json', 'utf-8'));

module.exports = emailLists;

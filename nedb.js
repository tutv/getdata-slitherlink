var Datastore = require('nedb');

var db = {};

var types = {
    '551': 0,
    '552': 4,
    '771': 10,
    '772': 11,
    '10101': 1,
    '10102': 5,
    '15151': 2,
    '15152': 6,
    '20201': 3,
    '20202': 7,
    '25301': 8,
    '25302': 9
};

db.data = new Datastore({filename: 'databases/data.db', autoload: true});
db.types = types;

module.exports = db;
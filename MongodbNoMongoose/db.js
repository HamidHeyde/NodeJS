var mongoClient = require('mongodb').MongoClient;

var db = {};

db.findUsers = function (db,col,query,callback) {

    // Find some documents
    db.collection(col).find(query).toArray(function (err, users) {
        if (!err&&users){
            callback(false,users);
        }else{
            callback(true,{"ERROR":"Requested Query could not be executed"});
        }
    });
};

module.exports = db;

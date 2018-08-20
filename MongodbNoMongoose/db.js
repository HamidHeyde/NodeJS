var mongoClient = require('mongodb').MongoClient;

var db = {};

db.findUsers = function (db,col,query,callback) {
    
    // Find some documents
    db.collection(col).find(query).toArray(function (err, docs) {
        if (!err&&docs){
            callback(false,docs);
        }else{
            callback(true,{"ERROR":"Requested Query could not be executed"});
        }
    });
};

module.exports = db;

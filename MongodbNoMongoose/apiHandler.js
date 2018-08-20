var mongoClient = require('mongodb').MongoClient;

var handlers = {};

handlers.notFound = function(data,callback){
    var message = {"ERROR":"Requested URL not There!"};
    callback(404,message);
};
handlers.ping = function(data,callback){
    var message = {"SUCCESS":"The App is UP!"};
    callback(200,message);
};
handlers.users = function(data,callback){

};

module.exports = handlers;
var mongoClient = require('mongodb').MongoClient;
var _db = require('./db');
var config = require('./config');

var handlers = {};

handlers.notFound = function (data, callback) {
    var message = { "ERROR": "Requested URL not There!" };
    callback(404, message);
};
handlers.ping = function (data, callback) {
    var message = { "SUCCESS": "The App is UP!" };
    callback(200, message);
};
handlers.users = function (data, callback) {
    var methods = ['get', 'post', 'put', 'delete', 'options'];

    if (methods.indexOf(data.method) > -1) {
        if ((data.method == 'get') || (data.method == 'options')) {

            //Parameters from Query String
            var dbName = typeof (data.queryString.db) == 'string' ? data.queryString.db : false;
            var collection = typeof (data.queryString.col) == 'string' ? data.queryString.col : false;;

            if (dbName && collection) {

                // Connection URL
                const url = config.db.url;

                // Use connect method to connect to the server
                mongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
                    // assert.equal(null, err);
                    if (!err && client) {
                        const db = client.db(dbName);

                        _db.findUsers(db, collection, {}, function (err, users) {

                            if (!err && users) {
                                //RETURNING THE DOCS
                                callback(200, 'json', users);
                            } else {
                                callback(404, 'json', { "ERROR": "Couldnot find the requested documnets" });
                            }

                            client.close();
                        });
                    } else {
                        // console.log("Connection to Server Failed");
                        callback(404, 'json', { "ERROR": "Failed to connecto to server" });
                    }
                });

            } else {
                //required varibales not available
                callback(404, 'json', { "ERROR": "Provided variables are not right" });
            }
        } else {
            //allowed JUST for GET, OPTIONS
            callback(404, 'json', { "ERROR": "Requested Method, is not allowed" });
        }
    } else {
        //the METHOD NOT ALLOWED
        callback(404, 'json', { "ERROR": "Requested Method, is not allowed" });
    }

};

module.exports = handlers;
var handlers = {};

handlers.notFound = function(data,callback){
    callback(404,{"ERROR":"Requested Page Doesn't Exist"});
};

handlers.notFound = function(data,callback){
    callback(200,{"SUCCESS":"The Application is UP!"});
};

module.exports = handlers;
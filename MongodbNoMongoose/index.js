var http = require('http');
var url = require('url');
var stringDecoder = require('string_decoder').StringDecoder;

var router = require('./router');

http.createServer(function (req, res) {

    var pathName = url.parse(req.url, true).pathname;
    var queryString = url.parse(req.url, true).query;
    var method = req.method.toLowerCase();
    var headers = req.headers;
    var buffer;
    var decoder = new stringDecoder('utf-8');

    req.on('data', function (data) {
        buffer += decoder.write(data);
    });

    req.on('end', function () {
        buffer += decoder.end();

        var inData = {
            'pathName': pathName,
            'queryString': queryString,
            'method': method,
            'headers': headers,
            'payload': buffer
        };

        var handler = (typeof (router[pathName]) != 'undefined') ? router[pathName] : router['notFound'];
        handler(inData, function (statusCode, data) {

            statusCode = typeof (statusCode) == 'number' ? statusCode : 200;
            data = typeof (data) == 'object' ? data : {};
            data = JSON.stringify(data);

            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(data);
        });
    });

}).listen(2500, function () {
    console.log("\x1b[41m",
        "http server running on port:2500"
        , "\x1b[0m");
});
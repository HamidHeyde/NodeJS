var http = require('http');
var url = require('url');
var strindDecoder = require('string_decoder').StringDecoder;

var router = require('./router');

var server = http.createServer(function (req, res) {

    var pathName = url.parse(req.url, true).pathname;
    var queryString = url.parse(req.url, true).query;
    var method = req.method.toLowerCase();
    var headers = req.headers;
    var buffer;

    var decoder = new strindDecoder('utf-8');
    req.on('data', function (data) {
        buffer += decoder.write(data);
    });
    req.on('end', function () {
        buffer += decoder.end();

        var inData = {
            'url': pathName,
            'queryString': queryString,
            'method': method,
            'headers': headers,
            'payload': buffer
        };
        console.log(inData);
        res.end();

    });
});

server.listen(2500, function () {
    console.log("Server is running on port 2500");
});

var apiHandlers = require('./apiHandlers');

var router = {
    'NotFound':apiHandlers.notFound,
    'api/ping':apiHandlers.ping
};

module.exports = router;
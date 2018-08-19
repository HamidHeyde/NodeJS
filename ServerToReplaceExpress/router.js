var apiHandlers = require('./apiHandlers');

var router = {
    'notFound':apiHandlers.notFound,
    '/api/ping':apiHandlers.ping
};

module.exports = router;
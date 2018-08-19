
var apiHandlers = require('./apiHandler');

var router  = {
    "/ping":apiHandlers.ping,
    "notFound":apiHandlers.notFound,
    "/users":apiHandlers.users
};

module.exports = router;

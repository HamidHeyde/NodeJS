module.exports = {
    requireLogin: function (req, res, next) {
        if (!req.user) {
            res.redirect('/users/login');
        } else {
            next();
        }
    }
}
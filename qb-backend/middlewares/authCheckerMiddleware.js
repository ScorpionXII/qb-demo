function authChecker(req, res, next) {
    if (!req.session.userId) {
        res.status(401).send('Authentication required for this endpoint!');
    } else {
        next();
    }
}

module.exports = authChecker;

const redirectIfAuthenticatedMiddleware = (req, res, next) => {
    if (req.session.userId){
        res.redirect('/');
    }
    next();
}

module.exports = redirectIfAuthenticatedMiddleware;
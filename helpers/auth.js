const helpers = {}

helpers.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error_msg', 'No está autenticado');
    res.redirect('/signin');
};

module.exports = helpers;

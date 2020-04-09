module.exports = {
    loginRequired: function(req, res, next){
        if(req.session.loggedin && req.session.email){
            next();
        } else {
            res.redirect('/login');
        }
    },
    logout: function(req, res, next){
        if(req.session.loggedin){
            req.session.loggedin = false;
            req.session.email = undefined;
        }
        res.redirect('/login');
    }
}
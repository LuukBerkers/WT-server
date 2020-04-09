module.exports = {
    loginRequired: function(req, res, next){
        if(req.session.loggedin && req.session.email){
            next();
        } else {
            if (process.env.NODE_ENV === 'development'){
                res.redirect('/login');
            } else {
                res.redirect('/group28/login');
            }
            
        }
    },
    logout: function(req, res, next){
        if(req.session.loggedin){
            req.session.loggedin = false;
            req.session.email = undefined;
            if (process.env.NODE_ENV === 'development'){
                res.redirect('/login');
            } else {
                res.redirect('/group28/login');
            }
        }
    }
}
// auth.js
// create middleware to prevent users from accessing pages if not allowed

function requireLogin(req,res,next){
    // "next" is the next function to get called 

    // check if req has a session
    if (req.session && req.session.userName){
        next(); // continue with what is expected
 }
    else{
        res.redirect('/login'); // redirect to login if not
 }
}

module.exports = {
    requireLogin
}

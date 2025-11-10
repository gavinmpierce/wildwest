const express = require('express');
const session = require('express-session');
const { requireLogin } = require("./auth"); // make sure someone is logged in to access page
const app = express();
const path = require('path');
const hbs = require('hbs');
const cookieParser = require('cookie-parser');

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// parses form submissions
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); 


const PORT = 8080;


app.use(session({
    secret: 'scooby',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, 
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

app.get('/',(req,res) => {
    let user = {
        username: "Guest",
        isLoggedIn: false,
        password: ""
    }
    if (req.session.isLoggedIn) {
        user = {
            name: req.session.username,
            isLoggedIn: true,
            loginTime: req.session.loginTime,
            visitCount: req.session.visitCount || 0
        };
        
        // Increment visit count
        req.session.visitCount = (req.session.visitCount || 0) + 1;
    }
    res.render('main',{ user: user });
});

app.get('/register', (req,res) => {
    res.render('register');
})

app.post('/register',(req,res) => {
    const name = (req.body && req.body.name) ? req.body.name : '';
    
    // Set cookie with user data
    res.cookie('name', JSON.stringify({
        name: name, 
        msg: "Hello there!"
    }), { 
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        secure: false,
        sameSite: "lax"
    });
    
    res.redirect('/login');
})


app.get('/login',(req,res) => {
    res.render('login');
});

app.post('/login',(req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    // Simple authentication (in production, use proper password hashing)
    if (username && password) {
        // Set session data
        req.session.isLoggedIn = true;
        req.session.username = username;
        req.session.loginTime = new Date().toISOString();
        
        console.log(`User ${username} logged in at ${req.session.loginTime}`);
        res.redirect('/');
    } else {
        res.redirect('/login?error=1');
    }
    
})

app.get('/comments',(req,res) => {

    let comments = {
        title: "Guest",
        content: "",
        author: "",
        date: ""
    }

    res.render('comments',{ user: user }, {comments:comments});
})

app.get('/comment/new',requireLogin,(req,res) => {
    res.render('newcomment',{ user: user });
})

app.post('/comment/new',requireLogin,(req,res) => {
    
})


app.post('/logout',requireLogin,(req,res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log('Error destroying session:', err);
        }
        res.redirect('/');
    });
})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});


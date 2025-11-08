const express = require('express');
const session = require('express-session');
const { requireLogin } = require("./auth");
const app = express();
const path = require('path');
const hbs = require('hbs');

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


const PORT = 8080;


app.use(session({
    secret: 'scooby',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set to true if using HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

app.get('/',(req,res) => {
    res.render('main');
});

app.get('/register', (req,res) => {
    res.render('register');
})


app.get('/login',(req,res) => {
    res.render('login');
});

app.get('/comments',(req,res) => {
    res.render('comments');
})

app.get('/comment/new',requireLogin,(req,res) => {
    res.render('newcomment');
})

app.get('/register',(req,res) => {
    
})

app.get('/login',(req,res) => {
    
})

app.get('/logout',requireLogin,(req,res) => {
    
})

app.get('/comment',requireLogin,(req,res) => {
    
})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});


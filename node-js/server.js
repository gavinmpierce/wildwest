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
    let name = req.session.userName || "Guest";
    res.send(`Hello ${name}`);
});

app.get('/profile', requireLogin, (req,res) => {
    res.send(`Welcome ${req.session.userName}, you are an instructor`);
})

app.get('/login',(req,res) => {
    res.send("You need to log in");
});

app.get('/fakelogin',(req,res) => {
    req.session.userName = "Gavin";
    res.send("Logged in");
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});


//Import Express and set up the app
const express = require('express');
const app = express();
const path = require("path");

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

//Required data from JSON file 
const { projects } = require('./data.json');

//Setting up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Add static middleware
app.use('/static', express.static('public'));

//Create index route
app.get('/', (req, res) => {
    res.render('index', { projects });
});

//Create the about route
app.get('/about', (req, res) => {
    res.render('about');
});

//Create project routes
app.get('/project/:id', (req, res, next) => {
    if (projects[req.params.id]) {
        res.render("project", { projects: projects[req.params.id] });
    } else {
        const err = new Error();
        err.status = 404;
        err.message = "Unfortunately the page you are looking for is not found. Return to Homepage.";
        next(err);
    }
});

//500 and global error handlers
app.get('/error', (req, res, next) => {
    const err = new Error();
    err.status = 500;
    err.message = "Unknown status: 500 Error.";
    throw err;
});

app.use((req, res, next) => {
    res.status(404).render('page-not-found');
});

app.use((err, req, res, next) => {
    if (err) {
        console.log('Global error handler called', err);
    }

    if (err.status === 404) {
        res.status(404).render('page-not-found', { err });
    } else {
        err.message = err.message || "Uh no! Looks like something went wrong on the server. Return to Homepage.";
        res.status(err.status || 500).render('error', { err });
    }
});

//Set up local server and print a message to terminal
app.listen(3000, () => {
    console.log('The application is running on localhost:3000! It works!! Yey!!');
});
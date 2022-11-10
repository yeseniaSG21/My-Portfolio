//Import Express and set up the app
const express = require('express');
const app = express();

const router = express.Router();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

//Required data from JSON file 
const { projects } = require('./data.json');

//Setting up middleware
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
        next();
    }
});

//404 and global error handlers
app.use((req, res, next) => {
    const err = new Error();
    err.status = 404;
    err.message = "Unfortunately the page you are looking for is not found. Return to Homepage.";
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    if (err.status === 404) {
        console.log(`Something went wrong. Status: ${err.status}. Message: ${err.message}.`);
        res.render('page-not-found');
    } else {
        res.render('error');
    }
});

//Set up local server and print a message to terminal
app.listen(3000, () => {
    console.log('The application is running on localhost:3000! It works!! Yey!!');
});
//Import Express and set up the app
const express = require('express');
const app = express();

//Required data from JSON file 
const { projects } = require('./data.json');

//Setting up middleware
app.set('view engine', 'pug');


//Set up local server and print a message to terminal
app.listen(3000, () => {
    console.log('The application is running on localhost:3000! It works!!');
});
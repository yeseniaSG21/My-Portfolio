//Import Express and set up the app
const express = require('express');
const app = express();

//Required data from JSON file 
const { projects } = require('./data.json');

//Setting up middleware
app.set('view engine', 'pug');

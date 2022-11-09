//Import Express and set up the app
const express = require('express');
const app = express();

//Require data from JSON file 
const data = require('./data.json');
const { projects } = data;

//Setting up middleware
app.set('view engine', 'pug');

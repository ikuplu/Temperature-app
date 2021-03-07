const express = require('express');
const exphbs = require('express-handlebars');
const axios = require('axios');

const app = express();

app.get('/', () => console.log('Hello everyone from backend!'));

app.listen('3000', () => console.log('Server started at port 3000'));

const express = require('express');
const exphbs = require('express-handlebars');
const axios = require('axios');

const app = express();

// Set the templating engine
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({ defaultLayout: false }));

// Body parser middleware
app.use(express.json());

app.get('/', (req, res) => res.send('Hello everyone from backend!'));

app.listen('3000', () => console.log('Server started at port 3000'));

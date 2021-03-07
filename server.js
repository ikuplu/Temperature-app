const express = require('express');
const exphbs = require('express-handlebars');
const axios = require('axios');

const app = express();

// Set the templating engine
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({ defaultLayout: false }));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.render('index'));

app.post('/weather', (req, res) => {
  const cityName = req.body.cityName;
  const API_KEY = require('./sources/keys.json').API_KEY;

  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`,
    )
    .then(function (response) {
      res.render('index', {
        weatherText: `The temperature in ${cityName} is ${response.data.main.temp}`,
      });
    })
    .catch(function (error) {
      res.render('index', {
        weatherText: `City not found`,
      });
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));

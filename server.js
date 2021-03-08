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
  let cityName = req.body.cityName;
  if (cityName[0] !== cityName[0].toUpperCase()) {
    cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
  }

  const API_KEY = require('./sources/keys.json').API_KEY;

  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`,
    )
    .then(function (response) {
      console.log(response.data);
      res.render('index', {
        weatherText: `The temperature in ${cityName} is ${response.data.main.temp}`,
        weatherText2: `You probably feel it as ${response.data.main.feels_like}`,
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

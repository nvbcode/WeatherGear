const apikey = process.env.REACT_APP_openWeather;
const $ = require("axios");
let weatherData = {
  temp: "",
  rain: "",
  weatherStat: ""
};
const Product = require("../models/Product");

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array.splice(0, 5);
}

module.exports = function(app) {
  app.post("/api/weather/", function(req, res) {
    let search = req.body.search;
    $.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${search}&APPID=${apikey}&units=imperial`
    )
      .then(function(resp) {
        let resultTemp = resp.data.main.temp;
        if (resultTemp >= 65) {
          weatherData.weatherStat = "hot";
        } else {
          weatherData.weatherStat = "cold";
        }
        weatherData.temp = resp.data.main.temp;
        weatherData.rain = resp.data.rain ? resp.data.rain : "";
        res.json(weatherData);
      })
      .catch(err => {
        throw err;
      });
  });

  app.get("/api/items/:id", function(req, res) {
    Product.find({ temp: req.params.id }).then(function(data) {
      shuffle(data);
      res.json(data);
    });
  });
};

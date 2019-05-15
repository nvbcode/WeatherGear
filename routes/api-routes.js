const apikey = process.env.REACT_APP_openWeather;
const $ = require("axios");
let weatherData = {
  temp: "",
  rain: "",
  weatherStat: ""
};
const Product = require("../models/Product");

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
        console.log("WeatherDAta", weatherData);
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
      console.log("data from database");
      res.json(data);
    });
  });
};

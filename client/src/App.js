import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  withStyles,
  Grid
} from "@material-ui/core";
import Header from "./components/Header";
import Modal from "./components/Modal";
import Item from "./components/Item";
import Search from "./components/Search";
import WeatherReport from "./components/WeatherReport";
import * as $ from "axios";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class App extends React.Component {
  state = {
    search: "",
    temp: "",
    rain: "",
    weatherStat: "",
    items: []
  };

  getWeather = e => {
    e.preventDefault();
    console.log(this.state.search);
    $.post("/api/weather/", {
      search: this.state.search
    }).then(res => {
      console.log(res.data);
      this.setState({
        temp: res.data.temp,
        rain: res.data.rain,
        weatherStat: res.data.weatherStat
      }, this.getItems);
    });

  };

  getItems = e => {
    console.log('reaches get items')
    console.log("state", this.state)
    let param = "";
    if (this.state.rain !== "") {
      param = this.state.rain;
    } else {
      param = this.state.weatherStat;
    }

    console.log('param', param);
    $.get(`/api/items/${param}`).then(res => {
      console.log(res);
      // this.setState({
      //   items:res
      // })
    });
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Header />
        <br />
        <Grid container sm justify="center" spacing={16}>
          <Grid item>
            <Search
              search={this.state.search}
              handleChange={this.handleChange}
              getWeather={this.getWeather}
            />
          </Grid>
          <Grid item>
            <WeatherReport temp={this.state.temp} />
          </Grid>
        </Grid>
        <br />
        <Grid containerjustify="center" spacing={16}>
          <Grid item>
            <Item />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(App);

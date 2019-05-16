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
    items: [],
    cart: []
  };

  getWeather = e => {
    e.preventDefault();
    console.log(this.state.search);
    $.post("/api/weather/", {
      search: this.state.search
    }).then(res => {
      console.log(res.data);
      this.setState(
        {
          temp: res.data.temp,
          rain: res.data.rain,
          weatherStat: res.data.weatherStat
        },
        this.getItems
      );
    });
  };

  getItems = () => {
    // console.log("reaches get items");
    // console.log("state", this.state);
    let param = "";
    if (this.state.rain !== "") {
      param = this.state.rain;
    } else {
      param = this.state.weatherStat;
    }

    console.log("param", param);
    $.get(`/api/items/${param}`).then(res => {
      console.log(res);
      this.setState({
        items: res.data
      });
    });
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

 addToCart = (e,name) => {
    e.preventDefault();
    // setting up cart
    let index;
    let cartItem = this.state.items.find((item, i) =>
    { 
      if (item._id === name) {
        index = i;
        return item
      }
    });

    let itemsArr = [...this.state.items];
    itemsArr.splice(index, 1);
    // console.log('this current state', this.state.items);
    // console.log('new items array', itemsArr);

    this.setState({
      cart: [...this.state.cart, cartItem],
      items: itemsArr
    }, function(){ console.log('CART IN APP', this.state.cart)});
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Header cart={this.state.cart} />
        <br />
        <Grid container justify="center" spacing={16}>
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
        <Grid container justify="center" spacing={16}>
          <Grid item>
            {this.state.items.length > 0 ? (
              <Item items={this.state.items} addToCart={this.addToCart} />
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(App);

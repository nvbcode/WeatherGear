import React from "react";
import "./App.css";
import {
  withStyles,
  Grid
} from "@material-ui/core";
import Header from "./components/Header";
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
    $.post("/api/weather/", {
      search: this.state.search
    }).then(res => {
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
    let param = "";
    if (this.state.rain !== "") {
      param = this.state.rain;
    } else {
      param = this.state.weatherStat;
    }

    $.get(`/api/items/${param}`).then(res => {
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

  addToCart = (e, name) => {
    e.preventDefault();
    // setting up cart
    let index;
    let cartItem = this.state.items.find((item, i) => {
      if (item._id === name) {
        index = i;
        return item;
      }
    });
    // removing from product list
    let itemsArr = [...this.state.items];
    itemsArr.splice(index, 1);
    this.setState(
      {
        cart: [...this.state.cart, cartItem],
        items: itemsArr
      },
      function() {
        console.log("CART IN APP", this.state.cart);
      }
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Header cart={this.state.cart} />
        <br />
        <Grid container justify="center" spacing={16}>
          <Grid item xs={6} sm={3}>
            <Search
              search={this.state.search}
              handleChange={this.handleChange}
              getWeather={this.getWeather}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
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

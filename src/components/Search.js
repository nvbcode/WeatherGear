import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";


const styles = {
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

class SimpleCard extends React.Component {

  render() {
    return (
      <Card id="searchBar">
        <CardContent>
          <Typography color="Default" gutterBottom>
            Search City:
          </Typography>
          <Typography variant="h5" component="h2" />
          <div>
            <InputBase
              name="search"
              value={this.props.search}
              onChange={this.props.handleChange}
              placeholder="Enter City Name..."
            />
          </div>
        </CardContent>
        <CardActions>
          <Button type="submit" size="small" onClick={this.props.getWeather}>
            Search
          </Button>
        </CardActions>
      </Card>
    );
  }
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleCard);

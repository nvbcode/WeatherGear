import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Button} from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import Modal from './Modal_2';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};


class ButtonAppBar extends React.Component {
  state = {
    cart: this.props.cart,
    visibleModal: false

  }
componentDidMount(){
   let newCart = this.props.cart;
    this.setState({
      cart: newCart
    });
}

modalToggle=(e)=> {
this.setState({
  visibleModal: this.state.visibleModal ? false : true
})
}
  render() {
  const { classes } = this.props;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            WeatherGear
          </Typography>
          { (this.props.cart.length > 0) ? <Button color="secondary" onClick={this.modalToggle}>CART</Button> : '' }
          { (this.state.visibleModal) ? <Modal modalState={this.state.visibleModal} modalToggle={this.modalToggle} cart={this.props.cart} /> : '' }
        </Toolbar>
      </AppBar>
    </div>
  );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const rows = [
  "Product Name",
  "Production Description",
  "Price",
  "Climate",
  "Add to Cart"
];

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  }
});

class SimpleModal extends React.Component {
  state = {
    open: false,
    cart: []
  };

  // getCart =() => {
  //   let newCart = this.props.cart;
  //   this.setState({
  //     cart: newCart
  //   })
  // };

  // componentDidMount() {
  //   // let newCart = this.props.cart;
  //   // this.setState({
  //   //   cart: newCart
  //   // });
  //   this.state.cart = this.props.cart
  //   console.log('modalCart',this.props.cart);
  // }

  // handleOpen = (e) => {
  //   e.preventDefault();
  //   this.setState({ 
  //     open: true,
  //   cart: this.props.cart });
  // };

  // handleClose = (e) => {
  //   e.preventDefault();
  //   this.setState({ open: false });
  // };

  render() {
    // console.log(this.props)
    const { classes } = this.props;

    console.log(classes)
    // console.log('state in modal render',this.props.cart)
    return (
      <div>
        <Button onClick={e=>this.props.modalToggle()} color="inherit">
          Cart
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.modalState}
          onClose={this.props.modalToggle}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    {rows.map((row, i) => {
                          return (
                            <TableCell align="right" key={i}>
                              {row}
                            </TableCell>
                          );
                        })
                      }
                  </TableRow>
                </TableHead>
                <TableBody>
                  {console.log('state in modal body',this.state)}
                  {/* {this.state.cart.map(row => (
                    <TableRow key={row._id}>
                      <TableCell align="right" component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.description}</TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                      <TableCell align="right">{row.temp}</TableCell>
                    </TableRow>
                  ))} */}
                </TableBody>
              </Table>
            </Paper>
            <SimpleModalWrapped />
          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;

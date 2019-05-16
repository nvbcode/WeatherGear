import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import IconButton from '@material-ui/core/IconButton';


const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

const rows = [
  "Product Name",
  "Production Description",
  "Price",
  "Climate",
  "Add to Cart"
];

function SimpleTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {props.items.length !== 0
              ? rows.map((row, i) => {
                  return (
                    <TableCell align="right" key={i}>
                      {row}
                    </TableCell>
                  );
                })
              : ""}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.items.map(row => (
            <TableRow key={row._id}>
              <TableCell align="right" component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.temp}</TableCell>
              <TableCell align='right'><IconButton
                color="primary"
                className={classes.button}
                name={row._id}
                aria-label="Add to shopping cart"
                onClick={e=>props.addToCart(e,row._id)}>
                <AddShoppingCartIcon name={row._id} />
              </IconButton></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTable);

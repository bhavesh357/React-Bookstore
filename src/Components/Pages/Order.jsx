import { Grid, Typography } from "@material-ui/core";
import React from "react";
import Navbar from "../Navbar";
import orderImage from "./../../Assets/icons/order.svg";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Order() {
  const classes = useStyles();
  return (
    <div className="order">
      <Navbar bookCount={0} />
      <Grid container className="order-details">
        <Grid item md={8} className="order-info">
          <img src={orderImage} alt="order successful" />
          <Typography variant="h4" className="order-title">
            Order Placed Successfully
          </Typography>
          <Grid item md={5}>
            <Typography className="order-subtitle">
              hurray!!! your order is confirmed. the order id is #123456 save
              the order id for further communication
            </Typography>
          </Grid>
          <Grid item container md={12} className="bookstore-details">
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead className="table-head" >
                  <TableRow>
                    <TableCell className="small-row" align="center">Email Us</TableCell>
                    <TableCell className="small-row" align="center">Contact Us</TableCell>
                    <TableCell align="center">Address</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow >
                      <TableCell className="small-body" align="center">admin@bookstore.com</TableCell>
                      <TableCell className="small-body" align="center">+91 8163475881</TableCell>
                      <TableCell align="center">42, 14th Main, 15th Cross, Sector 4, oppto BDA complex, near Kumarkom restaurant, HSR layout, Banglore 560334.</TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

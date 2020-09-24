import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import CustomerCart from "../CustomerCart";
import Navbar from "../Navbar";
import firebaseCalls from "./../../Service/firebase";

export default function Cart() {
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    firebaseCalls.getBookListWithDetails().then((res) => {
      console.log(res);
      setBookList(res);
    });
  }, []);

  return (
    <div className="dashboard">
      <Navbar
        bookCount={0}
        handleSearch={() => {
          console.log("cart");
        }}
      />
      <Grid container className="cart-details">
        <Grid item md={10}>
          <Grid item md={10}>
            <CustomerCart books={bookList}></CustomerCart>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

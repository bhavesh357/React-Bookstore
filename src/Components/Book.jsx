import { Grid } from "@material-ui/core";
import React,{ useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import firebaseCalls from './../Service/firebase';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function Book(props) {
  const classes = useStyles();


  const addInCart= () => {
    console.log("add");
    firebaseCalls.addBookToCart(props.book.id).then( (res) => {
      props.reloadBooks();
    });
  }

  const removeFromCart = () => {
    console.log("remove");
    firebaseCalls.removeBookToCart(props.book.id).then( (res) => {
      props.reloadBooks();
    });
  }

  return (
    <Grid className="book">
      <Card className={classes.root}>
        <div className="book-info">
          <div className="book-image-container">
            <img src={props.book.image} alt={props.book.title}/>
          </div>
          <div className="book-details">
            <Typography gutterBottom className="book-title" color="textPrimary" component="h2">
              {props.book.title}
            </Typography>
            <Typography className="book-author" color="textSecondary" component="p">
              by {props.book.author}
            </Typography>
            <Typography className="book-price" color="textPrimary" component="p">
              Rs. {props.book.price}
            </Typography>
          </div>
        </div>
        <Grid container spacing={0} className="book-buttons" >
        { props.inCart ? <Grid item md={12}>
          <Button size="small" onClick={removeFromCart} className="button full-button" variant="contained" color="secondary">
            Added to Bag
          </Button>
          </Grid> : <><Grid item md={6}>
          <Button size="small" onClick={addInCart} className="bag-button button" variant="contained" color="primary">
            Add to Bag
          </Button>
          </Grid>
        <Grid item md={6}>
          <Button size="small" className="button" variant="outlined" color="primary">
            Wishlist
          </Button>
          </Grid></>}
        
        </Grid>
      </Card>
    </Grid>
  );
}

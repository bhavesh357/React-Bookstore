import { Grid } from "@material-ui/core";
import React from "react";
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
    firebaseCalls.addBookToCart(props.book.id).then( () => {
      props.reloadBooks();
      props.showSnackbar(props.book.title+" has been added to the cart");
    });
  }

  const removeFromCart = () => {
    firebaseCalls.removeBookToCart(props.book.id).then( () => {
      props.showSnackbar(props.book.title+" has been removed from the cart");
      props.reloadBooks();
    });
  }

  const fullAddToBagButton = (<Grid item md={12}>
  <Button size="small" onClick={removeFromCart} className="button full-button" variant="contained" color="secondary">
    Added to Bag
  </Button>
  </Grid>);

const fullWishListButton = (<Grid item md={12}>
  <Button size="small" className="button full-button" variant="outlined" color="primary">
    Wishlist
  </Button>
  </Grid>);

  const bothButtons = (<><Grid item md={6}>
    <Button size="small" onClick={addInCart} className="bag-button button" variant="contained" color="primary">
      Add to Bag
    </Button>
    </Grid>
  <Grid item md={6}>
    <Button size="small" className="button" variant="outlined" color="primary">
      Wishlist
    </Button>
    </Grid></>);

  return (
    <Grid className="book">
      <Card className={classes.root}>
        <div className="book-info">
          <div className="book-image-container">
          { props.book.quantity===0 ?  <div className="out-of-stock" >Out Of Stock</div> : null}
            
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
        { props.book.quantity===0 ?  fullWishListButton : props.inCart ? fullAddToBagButton : bothButtons }
        </Grid>
      </Card>
    </Grid>
  );
}

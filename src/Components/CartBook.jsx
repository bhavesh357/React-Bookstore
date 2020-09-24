import { Button, IconButton, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import RemoveCircleOutlineRoundedIcon from "@material-ui/icons/RemoveCircleOutlineRounded";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import firebaseCalls from './../Service/firebase';

export default function CartBook(props) {
    const [selectedQuantity, setSelectedQuantity] = useState(props.book.selectedQuantity);
    const handleChange = (event) => {
        if(event.target.value<props.book.quantity){
            setSelectedQuantity(event.target.value);
            firebaseCalls.editQuantity(props.book.id,event.target.value);
        }
    }
    
    return (
        <div className="book-info-cart">
        <div className="book-image-container">
        <img src={props.book.image} alt={props.book.title} />
        </div>
        <div className="book-details-cart">
        <div className="book-info-side-cart" >
        <Typography
        gutterBottom
        className="book-title"
        color="textPrimary"
        component="h1"
        >
        {props.book.title}
        </Typography>
        <Typography
        className="book-author"
        color="textSecondary"
        component="p"
        >
        by {props.book.author}
        </Typography>
        <Typography
        className="book-price"
        color="textPrimary"
        component="p"
        >
        Rs. {props.book.price}
        </Typography>
        </div>
        <div className="book-cart-quantity">
        <IconButton onClick={()=> {
            if(selectedQuantity>1){
                setSelectedQuantity(selectedQuantity-1);
                firebaseCalls.editQuantity(props.book.id,selectedQuantity-1)
            }
        }} >
        <RemoveCircleOutlineRoundedIcon />
        </IconButton>
        <TextField onChange={handleChange} type="number" size="small" className="cart-book-quantity" variant="outlined" value={selectedQuantity} />
        <IconButton onClick={()=> {
            if(selectedQuantity<props.book.quantity){
                setSelectedQuantity(selectedQuantity+1);
                firebaseCalls.editQuantity(props.book.id,selectedQuantity+1);
            }
        }} >
        <AddCircleOutlineRoundedIcon />
        </IconButton>
        <Button onClick={() =>{
            firebaseCalls.removeBookToCart(props.book.id).then( () => {
                props.reloadCart();
            })
        }
    } >Remove</Button>
    </div>
    </div>
    </div>
    );
}

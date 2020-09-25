import { Button, Typography } from '@material-ui/core'
import React from 'react';
import CartBook from './CartBook';

export default function CustomerCart(props) {

    let cartBooks = props.books.map( (book) => {
        return <CartBook isQuantityShown={true} key={book.id} reloadCart={props.reloadCart} book={book}/>
    });

    return (
        <div className="cart-box" >
            <Typography variant="h5">
                My cart({props.books.length})
            </Typography>
            {props.books.length === 0 ? <div className="empty-cart" >Cart Is Empty</div> : 
            (<div className="cart-books" variant="h5">
                {cartBooks}
            </div> )}
            {/* <Button className="place-order" variant="contained" color="secondary" >Place Order</Button> */}
        </div>
    )
}

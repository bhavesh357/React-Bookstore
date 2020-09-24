import React from 'react'
import { connect, useSelector } from 'react-redux';
import BookList from '../BookList';
import Navbar from '../Navbar';
import firebaseCalls from './../../Service/firebase';

function Dashboard(props) {
    const auth = useSelector(state => state.firebase.auth);

    const [searchText, setSearchText] = React.useState('');

    const handleSearch = (text) => {
        setSearchText(text)
    }

    
    const handleBookToCart= (bookId,callback) => {
        console.log(auth);
        firebaseCalls.addBookToUser(bookId);
    }

    return (
        <div className="dashboard">
            <Navbar handleSearch={handleSearch} />
            <BookList handleBookToCart={handleBookToCart} searchText={searchText} />
        </div>
    )
}


export default Dashboard;

import React from 'react'
import { connect, useSelector } from 'react-redux';
import BookList from '../BookList';
import Navbar from '../Navbar';
import firebaseCalls from './../../Service/firebase';

function Dashboard(props) {
    const auth = useSelector(state => state.firebase.auth);

    const [searchText, setSearchText] = React.useState('');
    const [bookCount, setBookCount] = React.useState(0);

    const handleSearch = (text) => {
        setSearchText(text)
    }

    const changeBookBadge = (count) => {
        setBookCount(count);
    } 

    return (
        <div className="dashboard">
            <Navbar bookCount={bookCount} handleSearch={handleSearch} />
            <BookList changeBookBadge={changeBookBadge} searchText={searchText} />
        </div>
    )
}


export default Dashboard;

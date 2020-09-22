import React from 'react'
import { connect, useSelector } from 'react-redux';
import BookList from '../BookList';
import Navbar from '../Navbar';

function Dashboard(props) {
    const auth = useSelector(state => state.firebase.auth);

    const [searchText, setSearchText] = React.useState('');

    const handleSearch = (text) => {
        setSearchText(text)
    }

    return (
        <div className="dashboard">
            <Navbar handleSearch={handleSearch} />
            <BookList searchText={searchText} />
        </div>
    )
}


export default Dashboard;

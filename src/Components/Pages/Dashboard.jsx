import React from 'react'
import { connect, useSelector } from 'react-redux';
import BookList from '../BookList';
import Navbar from '../Navbar';

function Dashboard(props) {
    const auth = useSelector(state => state.firebase.auth);

    return (
        <div className="dashboard">
            <Navbar />
            <BookList />
        </div>
    )
}


export default Dashboard;

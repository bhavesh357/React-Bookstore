import React from 'react'
import { connect, useSelector } from 'react-redux';
import Navbar from '../Navbar';

function Dashboard(props) {
    const auth = useSelector(state => state.firebase.auth);

    return (
        <div className="dashboard">
            <Navbar />
        </div>
    )
}


export default Dashboard;

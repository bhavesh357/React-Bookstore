import React from 'react'
import { connect, useSelector } from 'react-redux';

function Dashboard(props) {
    console.log(useSelector(state => state));

    console.log(props);
    return (
        <div>
            r
        </div>
    )
}


export default Dashboard;

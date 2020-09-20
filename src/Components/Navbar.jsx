import { Button } from '@material-ui/core'
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signOut } from './../Redux/Actions/authActions';

function Navbar() {
    const dispatch = useDispatch();
    const auth = useSelector((state)=> state.firebase.auth);

    if(!auth.uid){
        return <Redirect to='/' />
    }

    const handleSignOut = () => {
        dispatch(signOut());
    } 


    return (
        <div>
            <Button 
                onClick={handleSignOut}
            >
                Sign-out
            </Button>
        </div>
    )
}

export default Navbar;

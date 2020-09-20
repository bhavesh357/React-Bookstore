import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import snackbarReducer from './snackbarReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    snackbar: snackbarReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer;
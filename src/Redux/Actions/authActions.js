export const signIn = ( credentials , callback) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then( () => {
            dispatch({
                type: 'LOGIN_SUCCESS'
            })
            callback();
        }).catch((err)=> {
            dispatch({
                type: 'LOGIN_FAILED',
                err
            })
            callback();
        })
    }
}

export const signOut = ( ) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then( () => {
            dispatch({
                type: 'SIGNOUT_SUCCESS'
            })
        }).catch((err)=> {
            dispatch({
                type: 'SIGNOUT_FAILED',
                err
            })
        })
    }
}



export const signUp = ( credentials , callback) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then((response) => {
            return firestore.collection('users').doc(response.user.uid).set({
                firstName: credentials.firstName,
                lastName: credentials.lastName,
                bookList: [],
            });
        }).then( () => {
            dispatch({
                type: 'SIGNUP_SUCCESS'
            })
            callback();
        }).catch((err)=> {
            dispatch({
                type: 'SIGNUP_FAILED',
                err
            })
            callback();
        })
    }
}
export const signIn = ( credentials ) => {
    return (dispatch, getState, {getFirebase, getFirestire}) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then( () => {
            dispatch({
                type: 'LOGIN_SUCCESS'
            })
        }).catch((err)=> {
            dispatch({
                type: 'LOGIN_FAILED',
                err
            })
        })
    }
}
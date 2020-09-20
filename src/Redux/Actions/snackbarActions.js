export const showSnackbar = (message) => {
    return {
        type: 'SHOW',
        message: message
    }
}

export const hideSnackbar = (message) => {
    return {
        type: 'HIDE',
        message: ''
    }
}
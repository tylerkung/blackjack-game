import { combineReducers } from 'redux';

const loggedInReducer = (login = false, action) => {
    if (action.type === 'LOGIN') {
        return true;
    } else if (action.type === 'LOGOUT'){
        return false;
    }
    return login;
}

export default combineReducers({
    loggedIn: loggedInReducer
})

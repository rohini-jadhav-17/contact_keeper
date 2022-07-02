import { createStore, combineReducers } from 'redux';
import alertReducer from '../context/alert/alertReducer';
import contactReducer from '../context/contact/contactReducer';
import authReducer from '../context/auth/authReducer';

// combine reducers if multiple 
const rootReducer = combineReducers({ authReducer, contactReducer, alertReducer });

// createStore
const store = createStore(rootReducer);

export default store;
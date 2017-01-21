import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import SessionReducer from './reducers/SessionReducers.js';


export default combineReducers({
    routing: routerReducer,
    ...SessionReducer
});

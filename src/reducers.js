import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import SessionReducer from './reducers/SessionReducer';
import TaskListsReducer from './reducers/TaskListsReducer';
import TasksReducer from './reducers/TasksReducer';

export default combineReducers({
  routing: routerReducer,
  ...SessionReducer,
  ...TaskListsReducer,
  ...TasksReducer
});

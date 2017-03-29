import AppConstants from '../constants/AppConstants';
import {browserHistory} from 'react-router';

import api from '../api';

const SessionActions = {
  loadClient(callback) {
    return (dispatch) => {
      api.loadClient()
            .then(() => {
              dispatch({
                type: AppConstants.SESSION_AUTHORIZE_SUCCESS
              });
              if (typeof callback === 'function') callback();
            })
            .catch((err) => {
              dispatch({
                type: AppConstants.SESSION_AUTHORIZE_FAIL,
                error: err
              });
              if (typeof callback === 'function') callback();
            });
    };
  },
  authorize() {
    return (dispatch) => {
      api.logIn()
            .then(() => {
              dispatch({
                type: AppConstants.SESSION_AUTHORIZE_SUCCESS
              });
            })
            .catch((err) => {
              dispatch({
                type: AppConstants.SESSION_AUTHORIZE_FAIL,
                error: err
              });
            });
    };
  },
  signOut() {
    return (dispatch) => {
      api.signOut()
            .then(() => {
              dispatch({
                type: AppConstants.SESSION_LOGOUT_SUCCESS
              });
              browserHistory.push(process.env.BASE_URL);
            });
    };
  }
};

export default SessionActions;

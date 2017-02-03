import AppConstants from '../constants/AppConstants';
import {browserHistory} from 'react-router';

import api from '../api';

const SessionActions = {
  loadClient(callback) {
    return (dispatch) => {
      api.loadClient()
            .then(() => {
              dispatch({
                type: AppConstants.SESSION_AUTHORIZE_SUCCESS,
                session: {
                  isLoggedIn: true
                }
              });
              if (typeof callback === 'function') callback();
            })
            .catch((err) => {
              dispatch({
                type: AppConstants.SESSION_AUTHORIZE_FAIL,
                session: {
                  isLoggedIn: false
                },
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
                type: AppConstants.SESSION_AUTHORIZE_SUCCESS,
                session: {
                  isLoggedIn: true
                }
              });
            })
            .catch((err) => {
              dispatch({
                type: AppConstants.SESSION_AUTHORIZE_FAIL,
                session: {
                  isLoggedIn: false
                },
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
                type: AppConstants.SESSION_LOGOUT_SUCCESS,
                session: {
                  isLoggedIn: false
                }
              });
              browserHistory.push('/login');
            });
    };
  }
};

export default SessionActions;

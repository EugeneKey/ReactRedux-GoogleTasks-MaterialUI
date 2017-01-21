import AppConstants from '../constants/AppConstants';

import api from '../api';

const SessionActions = {
    authorize(immediate = false, callback) {
        return (dispatch) => {
            api.authorize({immediate})
            .then(() => {
                dispatch({
                    type: AppConstants.SESSION_AUTHORIZE_SUCCESS,
                    session: {
                        isLoggedIn: true
                    }
                });
                if (callback) callback();
            })
            .catch((err) => {
                dispatch({
                    type: AppConstants.SESSION_AUTHORIZE_FAIL,
                    session: {
                        isLoggedIn: false
                    },
                    error: err
                });
                if (callback) callback();
            });
        };
    }
};

export default SessionActions;

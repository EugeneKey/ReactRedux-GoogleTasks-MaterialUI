import AppConstants from '../constants/AppConstants';

const initialState = {
    isLoggedIn: false
};

function sessionReducer(state = initialState, action) {
    switch (action.type) {
        case AppConstants.SESSION_AUTHORIZE_SUCCESS:
            return Object.assign({}, state, {
                isLoggedIn: action.session.isLoggedIn
            });

        case AppConstants.SESSION_AUTHORIZE_FAIL:
            return Object.assign({}, state, {
                isLoggedIn: action.session.isLoggedIn
            });

        case AppConstants.SESSION_LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                isLoggedIn: action.session.isLoggedIn
            });


        default:
            return state;
    }
}

const SessionReducer = {
    session: sessionReducer
};

export default SessionReducer;
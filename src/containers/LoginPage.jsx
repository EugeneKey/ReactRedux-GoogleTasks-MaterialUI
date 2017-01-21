import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import SessionActions from '../actions/SessionActions';

import LoginPage from '../components/LoginPage.jsx';

class LoginPageContainer extends Component {
    handleLogIn() {
        this.props.dispatch( SessionActions.authorize() );
    }

    redirectLoggedInUser() {
        const { location } = this.props
        if (location.state && location.state.nextPathname) {
            this.context.router.replace(location.state.nextPathname);
        } else {
            this.context.router.replace('/list');
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.session.isLoggedIn) {
            this.redirectLoggedInUser();
        }
    }

    componentDidMount() {
        if (this.props.session.isLoggedIn) {
          this.redirectLoggedInUser();
        }
    }

    render() {
        return (
            <LoginPage onLogIn={this.handleLogIn.bind(this)} />
        );
    }

}

LoginPageContainer.contextTypes = {
    router: PropTypes.object.isRequired,
//    session: PropTypes.object.isRequired,
//    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        session: state.session  
    };
}

export default connect(mapStateToProps)(LoginPageContainer);

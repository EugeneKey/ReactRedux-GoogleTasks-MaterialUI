import React, {Component} from 'react';
import {Router, Route, Redirect} from 'react-router';

import App from './app';
import LoggedInLayout from './components/LoggedInLayout';
import AboutPage from './components/AboutPage';
import TasklistsPage from './containers/TasklistsPage';
import TasksPage from './containers/TasksPage';
import LoginPage from './containers/LoginPage';

export default class AllRouter extends Component {

  constructor() {
    super();

    this.requireAuth = this.requireAuth.bind(this);

    // Configure routes here as this solves a problem with hot loading where
    // the routes are recreated each time.
    this.routes = (
      <Route component={App} path='/'>
        <Route path='/login' component={LoginPage} />
        <Route component={LoggedInLayout} onEnter={this.requireAuth}>
          <Route path='/lists' component={TasklistsPage}>
            <Route path='/about' component={AboutPage} />
            <Route path='/lists/:id' component={TasksPage} />
          </Route>
        </Route>
      </Route>
    );
  }

  requireAuth(nextState, replace) {
    const {getState} = this.props;
    if (!getState().session.isLoggedIn) {
      replace({
        pathname: '/login',
        state: {nextPathname: nextState.location.pathname}
      });
    }
  }

  render() {
    const {history} = this.props;
    return (     
      <Router history={ history }> 
        <Redirect from='/' to='/login' />
        { this.routes }
      </Router>        
    );
  }
}

AllRouter.propTypes = {
  getState: React.PropTypes.func.isRequired,
  history: React.PropTypes.object.isRequired
};

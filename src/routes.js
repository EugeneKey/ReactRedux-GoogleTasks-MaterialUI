import React, { Component } from 'react';
import { Router, Route, Redirect } from 'react-router'

import App from './app';
import LoggedInLayout from './components/LoggedInLayout.jsx';
import AboutPage from './components/AboutPage.jsx';
import TasklistsPage from './containers/TasklistsPage.jsx';
import TasksPage from './containers/TasksPage.jsx';
import LoginPage from './containers/LoginPage.jsx';

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
                    <Route path='/about' component={AboutPage} />
                    <Route path='/lists' component={TasklistsPage}>
                        <Route path='/lists/:id' component={TasksPage} />
                    </Route>
                </Route>
            </Route>
    );
  }

  requireAuth(nextState, replace) {
    const { getState } = this.props;
    console.log(getState().session.isLoggedIn);
    if (!getState().session.isLoggedIn) {
        replace({
            pathname: '/login',
            state: {nextPathname: nextState.location.pathname}
        });
    }
  }

  render() {
    const { history } = this.props;
    return (     
        <Router history={ history }> 
            <Redirect from='/' to='/login' />
            { this.routes }
        </Router>        
    );
  }
}
import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';

import '../styles/LoginPage.less';

class LoginPage extends Component {
    render() {
        return (
            <div className='LoginPage'>
                <div className='LoginPage__banner'>
                    <div className='LoginPage__text'>
                        <h1>Material UI Google Tasks</h1>
                        <p>Organise your life!</p>
                        <RaisedButton
                            className='LoginPage__button'
                            label='Log in with Google'
                            onClick={this.props.onLogIn}
                        />
                    </div>
                    <img
                        src='img/desk.png'
                        className='LoginPage__image'
                    />
                </div>
            </div>
        );
    }
}

export default LoginPage;

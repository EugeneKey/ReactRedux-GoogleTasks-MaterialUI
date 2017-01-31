import React, { Component } from 'react';
import { Link } from 'react-router';

import Paper from 'material-ui/Paper';

import '../styles/AboutPage.less';

class AboutPage extends Component {
    render() {
        return (
            <div className='AboutPage'>
                <Paper
                    zDepth={1}
                    className='AboutPage__content'
                >
                    <h2> Material UI Google Tasks </h2>
                    <p>This application is written based on <a href='https://developers.google.com/google-apps/tasks/'>
                    Google Tasks API</a> using Material Design concepts.</p>
                </Paper>
            </div>
        );
    }
}

export default AboutPage;

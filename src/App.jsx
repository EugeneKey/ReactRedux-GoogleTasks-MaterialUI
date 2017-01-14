import React from 'react';
import { Link } from 'react-router';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './styles/base.less';

const App = React.createClass({
    render() {
        return (
        	<MuiThemeProvider>
            <div className='App'>
                {this.props.children}
            </div>
           </MuiThemeProvider>
        );
    },
});

export default App;

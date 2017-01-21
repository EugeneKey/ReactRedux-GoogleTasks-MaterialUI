import React, { Component } from 'react';
import DevTools from './utils/devtools';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './styles/base.less';

class App extends Component {
    render() {
        return (
        	<MuiThemeProvider>
            <div className='App'>
                {this.props.children}
                { process.env.NODE_ENV !== 'production' ? <DevTools /> : null }
            </div>
           </MuiThemeProvider>
        );
    }
}

export default App;

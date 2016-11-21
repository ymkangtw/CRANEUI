import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import MyComponent from './MyComponent.jsx';

injectTapEventPlugin();

const lightMuiTheme = getMuiTheme(lightBaseTheme);

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={lightMuiTheme}>
                <div>
                    <h1>React Example!</h1>
                    <MyComponent />
                </div>
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));

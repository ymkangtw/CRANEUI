import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

import injectTapEventPlugin from 'react-tap-event-plugin';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//import MyComponent from './components/MyComponent.jsx';
import Main from './components/main.jsx';
import WMSQuery from './components/wmsquery.jsx';
import CraneInfo from './components/craneinfo.jsx';
import CraneAction from './components/craneaction.jsx';
import WMSCMD from './components/wmscmd.jsx';
import WMSACK from './components/wmsack.jsx';
import ActionRecv from './components/actionrecv.jsx';
import ActionACK from './components/actionack.jsx';
//import CoilPTY from './components/coil.jsx';
//import TodoApp from './components/todo.jsx';

import TodoBox from './components/todolist.jsx';


injectTapEventPlugin();
/*
class App extends React.Component {
    render() {
        return (
            <div>
                <h1>React Example!</h1>
                <Main width="800" height="600" />
            </div>
        );
    }
}
*/
var todoItems = [];
todoItems.push({ index: 1, value: "learn react", done: false });
todoItems.push({ index: 2, value: "Go shopping", done: true });
todoItems.push({ index: 3, value: "buy flowers", done: true });

const lightMuiTheme = getMuiTheme(lightBaseTheme);

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={lightMuiTheme}>
                <div>
                    <Main width="800" height="320" />
                    <br />
                    <WMSQuery />
                    <CraneInfo />
                    <WMSCMD />
                    <WMSACK />
                    <ActionRecv />
                    <ActionACK />
                    <CraneAction />
                    <TodoBox />
                    {/*<CoilPTY />*/}
                    {/*<TodoApp initItems={todoItems} />*/}
                </div>
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));

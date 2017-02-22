import React from 'react';
import ReactDOM from 'react-dom';
import Paper from 'material-ui/Paper';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import cio from 'socket.io-client';

const PaperStyle = {
    //height: 400,
    width: 400,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
};

export default class CraneInfo extends React.Component {
    constructor(props) {
        super(props);
        this.socket = cio.connect();
        this.state = {
            rspdata: {}
        };
        this.updateData = this.updateData.bind(this);
    }
    componentDidMount() {
        this.socket.on('rspdata', this.updateData);
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props !== nextProps) {
            return true;
        }
        if (this.state.rspdata !== nextState.rspdata) {
            return true;
        }
        return false;
    }
    updateData(data) {
        this.setState({ rspdata: data });
    }
    render() {
        return (
            <Paper style={PaperStyle} zDepth={3}>
                <Table selectable={false} displaySelectAll={false} adjustForCheckbox={false}>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn><h1>CRANE STATUS</h1></TableHeaderColumn>

                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        <TableRow>
                            <TableRowColumn>WORKID</TableRowColumn>
                            <TableRowColumn>{this.state.rspdata.WORKID}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>HOUSEID</TableRowColumn>
                            <TableRowColumn>{this.state.rspdata.HOUSEID}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>CRANEID</TableRowColumn>
                            <TableRowColumn>{this.state.rspdata.CRANEID}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>WORKTIME</TableRowColumn>
                            <TableRowColumn>{this.state.rspdata.WORKTIME}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>RESULT</TableRowColumn>
                            <TableRowColumn>{this.state.rspdata.RESULT}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>POSX</TableRowColumn>
                            <TableRowColumn>{this.state.rspdata.POSX}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>POSY</TableRowColumn>
                            <TableRowColumn>{this.state.rspdata.POSY}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>POSZ</TableRowColumn>
                            <TableRowColumn>{this.state.rspdata.POSZ}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>DEVSTATUS</TableRowColumn>
                            <TableRowColumn>{this.state.rspdata.DEVSTATUS}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>ERRORCODE</TableRowColumn>
                            <TableRowColumn>{this.state.rspdata.ERRORCODE}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>ACCEPTABLE</TableRowColumn>
                            <TableRowColumn>{this.state.rspdata.ACCEPTABLE}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>MODE</TableRowColumn>
                            <TableRowColumn>{this.state.rspdata.MODE}</TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>

        );
    }
}

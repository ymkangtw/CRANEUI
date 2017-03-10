import React from 'react';
import ReactDOM from 'react-dom';
import Paper from 'material-ui/Paper';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import cio from 'socket.io-client';

const PaperStyle = {
    //height: 400,
    width: 280,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
};
const TableStyle = {
    align: 'left',
    textAlign: 'left',
    width: 260
};

export default class CraneInfo extends React.Component {
    constructor(props) {
        super(props);
        this.socket = cio.connect();
        this.state = {
            rspData: {}
        };
        this.updateData = this.updateData.bind(this);
    }
    componentDidMount() {
        this.socket.on('rspCraneStatus', this.updateData);
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props !== nextProps) {
            return true;
        }
        if (this.state.rspData !== nextState.rspData) {
            return true;
        }
        return false;
    }
    updateData(data) {
        this.setState({ rspData: data });
    }
    render() {
        return (
            <Paper style={PaperStyle} zDepth={3}>

                <table style={TableStyle}>
                    <tr>
                        <th><h5>CRANE STATUS</h5></th>
                    </tr>
                    <tr>
                        <td>WORKID</td><td>{this.state.rspData.WORKID}</td>
                    </tr>
                    <tr>
                        <td>HOUSEID</td><td>{this.state.rspData.HOUSEID}</td>
                    </tr>
                    <tr>
                        <td>CRANEID</td><td>{this.state.rspData.CRANEID}</td>
                    </tr>
                    <tr>
                        <td>WORKTIME</td><td>{this.state.rspData.WORKTIME}</td>
                    </tr>
                    <tr>
                        <td>RESULT</td><td>{this.state.rspData.RESULT}</td>
                    </tr>
                    <tr>
                        <td>POSX</td><td>{this.state.rspData.POSX}</td>
                    </tr>
                    <tr>
                        <td>POSY</td><td>{this.state.rspData.POSY}</td>
                    </tr>
                    <tr>
                        <td>POSZ</td><td>{this.state.rspData.POSZ}</td>
                    </tr>
                    <tr>
                        <td>DEVSTATUS</td><td>{this.state.rspData.DEVSTATUS}</td>
                    </tr>
                    <tr>
                        <td>ERRORCODE</td><td>{this.state.rspData.ERRORCODE}</td>
                    </tr>
                    <tr>
                        <td>ACCEPTABLE</td><td>{this.state.rspData.ACCEPTABLE}</td>
                    </tr>
                    <tr>
                        <td>MODE</td><td>{this.state.rspData.MODE}</td>
                    </tr>
                </table>

{/*
                <Table selectable={false} displaySelectAll={false} adjustForCheckbox={false} height={400}>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn><h1>CRANE STATUS</h1></TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        <TableRow>
                            <TableRowColumn>WORKID</TableRowColumn>
                            <TableRowColumn>{this.state.rspData.WORKID}</TableRowColumn>
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
*/}
            </Paper>

        );
    }
}

import React from 'react';
import ReactDOM from 'react-dom';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
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
const TextFieldStyle = {
    width: 120
};

export default class CoilPTY extends React.Component {
    constructor(props) {
        super(props);
        this.socket = cio.connect();
        this.state = {
                COILID: '',
                POSX: 0,
                POSY: 0,
                POSZ: 0,
                COILINNDIA: 0,
                COILOUTDIA: 0,
                COILWIDTH: 0,
                COILWEIGHT: 0
            /*reqData: {
                COILID: '',
                POSX: 0,
                POSY: 0,
                POSZ: 0,
                COILINNDIA: 0,
                COILOUTDIA: 0,
                COILWIDTH: 0,
                COILWEIGHT: 0
            }*/
        };
        //this.updateData = this.updateData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSend = this.handleSend.bind(this);
    }
    /*
    componentDidMount() {
        this.socket.on('rspCraneStatus', this.updateData);
    }
    */
    /*
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props !== nextProps) {
            return true;
        }
        if (this.state.reqData !== nextState.reqData) {
            return true;
        }
        return false;
    }
    */
    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }
    handleSend() {
        //let reqData = this.state;

    }
    //updateData(data) {
    //    this.setState({ reqData: data });
    //}
    render() {
        return (
            <Paper style={PaperStyle} zDepth={3}>

                <table style={TableStyle}>
                    <tr>
                        <th><h5>COIL PROPERTY</h5></th>
                    </tr>
                    <tr>
                        <td>COILID</td><td><TextField hintText="COILID" style={TextFieldStyle} name="COILID" value={this.state.COILID} onChange={this.handleChange} /></td>
                    </tr>
                    <tr>
                        <td>POSX</td><td><TextField hintText="POSX" style={TextFieldStyle} name="POSX" value={this.state.POSX} onChange={this.handleChange} /></td>
                    </tr>
                    <tr>
                        <td>POSY</td><td><TextField hintText="POSY" style={TextFieldStyle} name="POSY" value={this.state.POSY} onChange={this.handleChange} /></td>
                    </tr>
                    <tr>
                        <td>POSZ</td><td><TextField hintText="POSZ" style={TextFieldStyle} name="POSZ" value={this.state.POSZ} onChange={this.handleChange} /></td>
                    </tr>
                    <tr>
                        <td>COILINNDIA</td><td><TextField hintText="COILINNDIA" style={TextFieldStyle} name="COILINNDIA" value={this.state.COILINNDIA} onChange={this.handleChange} /></td>
                    </tr>
                    <tr>
                        <td>COILOUTDIA</td><td><TextField hintText="COILOUTDIA" style={TextFieldStyle} name="COILOUTDIA" value={this.state.COILOUTDIA} onChange={this.handleChange} /></td>
                    </tr>
                    <tr>
                        <td>COILWIDTH</td><td><TextField hintText="COILWIDTH" style={TextFieldStyle} name="COILWIDTH" value={this.state.COILWIDTH} onChange={this.handleChange} /></td>
                    </tr>
                    <tr>
                        <td>COILWEIGHT</td><td><TextField hintText="COILWEIGHT" style={TextFieldStyle} name="COILWEIGHT" value={this.state.COILOUTDIA} onChange={this.handleChange} /></td>
                    </tr>
                    <tr>
                        <td><RaisedButton label="SET" primary={true} onClick={this.handleSend}/></td>
                    </tr>
                </table>
            </Paper>

        );
    }
}

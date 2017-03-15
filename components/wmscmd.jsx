import React from 'react';
import ReactDOM from 'react-dom';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
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
    width: 280
};
const TextFieldStyle = {
    width: 140
};

export default class WMSCMD extends React.Component {
    constructor(props) {
        super(props);
        this.socket = cio.connect();
        this.state = {
            WORKID: 'CMDPUT01',
            HOUSEID: '25',
            CRANEID: 'D0822',
            WORKTIME: '20170315163000',
            COILID: 'F12345',
            FROMX: 4.1,
            FROMY: 1.5,
            FROMZ: 5.5,
            TOX: 20.0,
            TOY: 12.5,
            TOZ: 5.8,
            COILINNDIA: 0.508,
            COILOUTDIA: 1.1,
            COILWIDTH: 1.2,
            COILWEIGHT: 9.6
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSend = this.handleSend.bind(this);
    }
    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }
    handleSend() {
        this.socket.emit('sendWMSCMD', this.state);
        console.log(this.state);
    }
    render() {
        return (
            <Paper style={PaperStyle} zDepth={3}>

                <table style={TableStyle}>
                    <tr>
                        <th><h5>CRANE COMMAND</h5></th>
                    </tr>
                    <tr>
                        <td>WORKID</td>
                        <td><input hintText="WORKID" style={TextFieldStyle} name="COILID" value={this.state.WORKID} onChange={this.handleChange} /></td>
                    </tr>
                    <tr>
                        <td>HOUSEID</td>
                        <td><input hintText="HOUSEID" style={TextFieldStyle} name="HOUSEID" value={this.state.HOUSEID} onChange={this.handleChange} /></td>
                    </tr>
                    <tr>
                        <td>CRANEID</td>
                        <td><input hintText="CRANEID" style={TextFieldStyle} name="CRANEID" value={this.state.CRANEID} onChange={this.handleChange} /></td>
                    </tr>
                    <tr>
                        <td>WORKTIME</td>
                        <td><input hintText="WORKTIME" style={TextFieldStyle} name="WORKTIME" value={this.state.WORKTIME} onChange={this.handleChange} /></td>
                    </tr>
                    <tr>
                        <td>COILID</td>
                        <td><input hintText="COILID" style={TextFieldStyle} name="COILID" value={this.state.COILID} onChange={this.handleChange} /></td>
                    </tr>
                    <tr>
                        <td>FROMX</td>
                        <td><input hintText="FROMX" style={TextFieldStyle} name="FROMX" value={this.state.FROMX} onChange={this.handleChange} /></td>
                    </tr>
                    <tr>
                        <td>FROMY</td>
                        <td><input hintText="FROMY" style={TextFieldStyle} name="FROMY" value={this.state.FROMY} onChange={this.handleChange} /></td>
                    </tr>
                    <tr>
                        <td>FROMZ</td>
                        <td><input hintText="FROMZ" style={TextFieldStyle} name="FROMZ" value={this.state.FROMZ} onChange={this.handleChange} /></td>
                    </tr>
                    <tr>
                        <td>TOX</td>
                        <td><input hintText="TOX" style={TextFieldStyle} name="TOX" value={this.state.TOX} onChange={this.handleChange} /></td>
                    </tr>
                    <tr>
                        <td>TOY</td>
                        <td><input hintText="TOY" style={TextFieldStyle} name="TOY" value={this.state.TOY} onChange={this.handleChange} /></td>
                    </tr>
                    <tr>
                        <td>TOZ</td>
                        <td><input hintText="TOZ" style={TextFieldStyle} name="TOZ" value={this.state.TOZ} onChange={this.handleChange} /></td>
                    </tr>
                    <tr>
                        <td>COILINNDIA</td>
                        <td><input hintText="COILINNDIA" style={TextFieldStyle} name="COILINNDIA" value={this.state.COILINNDIA} onChange={this.handleChange} /></td>
                    </tr>
                    <tr>
                        <td>COILOUTDIA</td>
                        <td><input hintText="COILOUTDIA" style={TextFieldStyle} name="HOUSCOILOUTDIAEID" value={this.state.COILOUTDIA} onChange={this.handleChange} /></td>
                    </tr>
                    <tr>
                        <td>COILWIDTH</td>
                        <td><input hintText="COILWIDTH" style={TextFieldStyle} name="COILWIDTH" value={this.state.COILWIDTH} onChange={this.handleChange} /></td>
                    </tr>
                    <tr>
                        <td>COILWEIGHT</td>
                        <td><input hintText="COILWEIGHT" style={TextFieldStyle} name="COILWEIGHT" value={this.state.COILWEIGHT} onChange={this.handleChange} /></td>
                    </tr>
                    <tr>
                        <td><RaisedButton label="SET" primary={true} onClick={this.handleSend}/></td>
                    </tr>
                </table>
            </Paper>

        );
    }
}

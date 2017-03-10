import React from 'react';
import ReactDOM from 'react-dom';
import Paper from 'material-ui/Paper';
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

export default class ActionRecv extends React.Component {
    constructor(props) {
        super(props);
        this.socket = cio.connect();
        this.state = {
            rspData: {}
        };
        this.updateData = this.updateData.bind(this);
    }
    componentDidMount() {
        this.socket.on('recvActionCompleted', this.updateData);
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
                        <th><h5>ACTION COMPLETED</h5></th>
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
                        <td>COILID</td><td>{this.state.rspData.COILID}</td>
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
                        <td>ERRORCODE</td><td>{this.state.rspData.ERRORCODE}</td>
                    </tr>
                </table>
            </Paper>

        );
    }
}

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

export default class WMSACK extends React.Component {
    constructor(props) {
        super(props);
        this.socket = cio.connect();
        this.state = {
            rspData: {}
        };
        this.updateData = this.updateData.bind(this);
    }
    componentDidMount() {
        this.socket.on('rspCMDACK', this.updateData);
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
                        <th><h5>PLC COMMAND ACK</h5></th>
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
                        <td>CMDID</td><td>{this.state.rspData.CMDID}</td>
                    </tr>
                    <tr>
                        <td>CMDWORKTIME</td><td>{this.state.rspData.CMDWORKTIME}</td>
                    </tr>
                    <tr>
                        <td>COILID</td><td>{this.state.rspData.COILID}</td>
                    </tr>
                    <tr>
                        <td>FROMX</td><td>{this.state.rspData.FROMX}</td>
                    </tr>
                    <tr>
                        <td>FROMY</td><td>{this.state.rspData.FROMY}</td>
                    </tr>
                    <tr>
                        <td>FROMZ</td><td>{this.state.rspData.FROMZ}</td>
                    </tr>
                    <tr>
                        <td>TOX</td><td>{this.state.rspData.TOX}</td>
                    </tr>
                    <tr>
                        <td>TOY</td><td>{this.state.rspData.TOY}</td>
                    </tr>
                    <tr>
                        <td>TOZ</td><td>{this.state.rspData.TOZ}</td>
                    </tr>
                    <tr>
                        <td>COILINNDIA</td><td>{this.state.rspData.COILINNDIA}</td>
                    </tr>
                    <tr>
                        <td>COILOUTDIA</td><td>{this.state.rspData.COILOUTDIA}</td>
                    </tr>
                    <tr>
                        <td>COILWIDTH</td><td>{this.state.rspData.COILWIDTH}</td>
                    </tr>
                    <tr>
                        <td>COILWEIGHT</td><td>{this.state.rspData.COILWEIGHT}</td>
                    </tr>
                </table>
            </Paper>
        );
    }
}

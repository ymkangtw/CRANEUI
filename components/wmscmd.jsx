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

export default class WMSCMD extends React.Component {
    constructor(props) {
        super(props);
        this.socket = cio.connect();
        this.state = {
            reqData: {}
        };
        this.updateData = this.updateData.bind(this);
    }
    componentDidMount() {
        this.socket.on('reqCMD', this.updateData);
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props !== nextProps) {
            return true;
        }
        if (this.state.reqData !== nextState.reqData) {
            return true;
        }
        return false;
    }
    updateData(data) {
        this.setState({ reqData: data });
    }
    render() {
        return (
            <Paper style={PaperStyle} zDepth={3}>

                <table style={TableStyle}>
                    <tr>
                        <th><h5>CRANE COMMAND</h5></th>
                    </tr>
                    <tr>
                        <td>WORKID</td><td>{this.state.reqData.WORKID}</td>
                    </tr>
                    <tr>
                        <td>HOUSEID</td><td>{this.state.reqData.HOUSEID}</td>
                    </tr>
                    <tr>
                        <td>CRANEID</td><td>{this.state.reqData.CRANEID}</td>
                    </tr>
                    <tr>
                        <td>WORKTIME</td><td>{this.state.reqData.WORKTIME}</td>
                    </tr>
                    <tr>
                        <td>COILID</td><td>{this.state.reqData.COILID}</td>
                    </tr>
                    <tr>
                        <td>FROMX</td><td>{this.state.reqData.FROMX}</td>
                    </tr>
                    <tr>
                        <td>FROMY</td><td>{this.state.reqData.FROMY}</td>
                    </tr>
                    <tr>
                        <td>FROMZ</td><td>{this.state.reqData.FROMZ}</td>
                    </tr>
                    <tr>
                        <td>TOX</td><td>{this.state.reqData.TOX}</td>
                    </tr>
                    <tr>
                        <td>TOY</td><td>{this.state.reqData.TOY}</td>
                    </tr>
                    <tr>
                        <td>TOZ</td><td>{this.state.reqData.TOZ}</td>
                    </tr>
                    <tr>
                        <td>COILINNDIA</td><td>{this.state.reqData.COILINNDIA}</td>
                    </tr>
                    <tr>
                        <td>COILOUTDIA</td><td>{this.state.reqData.COILOUTDIA}</td>
                    </tr>
                    <tr>
                        <td>COILWIDTH</td><td>{this.state.reqData.COILWIDTH}</td>
                    </tr>
                    <tr>
                        <td>COILWEIGHT</td><td>{this.state.reqData.COILWEIGHT}</td>
                    </tr>
                </table>
            </Paper>

        );
    }
}

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

export default class WMSQuery extends React.Component {
    constructor(props) {
        super(props);
        this.socket = cio.connect();
        this.state = {
            reqData: {}
        };
        this.updateData = this.updateData.bind(this);
    }
    componentDidMount() {
        this.socket.on('reqCraneStatus', this.updateData);
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
                        <th><h5>CRANE QUERY</h5></th>
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
                </table>
            </Paper>

        );
    }
}

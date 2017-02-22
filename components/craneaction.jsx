import React from 'react';
import ReactDOM from 'react-dom';
import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import cio from 'socket.io-client';
import {
    blue50, blue300,
    orange50, orange300,
    lightGreen50, lightGreen300
} from 'material-ui/styles/colors';

const PaperStyle = {
    //height: 400,
    width: 600,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
};
const TableStyle = {
    align: 'left',
    textAlign: 'left',
    width: 600
};
const ActionStyle = {
    action: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    input: {
        type: 'text',
        width: 80
    },
    btn: {
        width: 80
    }
};

export default class CraneAction extends React.Component {
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
                <table style={TableStyle}>
                    <tr>
                        <th><h5>CRANE ACTION</h5></th>
                    </tr>
                    <tr>
                        <td style={ActionStyle.action}>
                            <Chip backgroundColor={blue300}>
                                <strong>MOVE</strong>
                            </Chip>
                            <Chip backgroundColor={blue50}>
                                POS X: <input style={ActionStyle.input} />
                                POS Y: <input style={ActionStyle.input} />
                            </Chip>
                            <RaisedButton
                                backgroundColor={blue300}
                                label="ADD"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td style={ActionStyle.action}>
                            <Chip backgroundColor={orange300}>
                                <strong>GET</strong>
                            </Chip>
                            <Chip backgroundColor={orange50}>
                                POS Z: <input style={ActionStyle.input} />
                            </Chip>
                            <RaisedButton
                                backgroundColor={orange300}
                                label="ADD"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td style={ActionStyle.action}>
                            <Chip backgroundColor={lightGreen300}>
                                <strong>PUT</strong>
                            </Chip>
                            <Chip backgroundColor={lightGreen50}>
                                POS Z: <input style={ActionStyle.input} />
                            </Chip>
                            <RaisedButton
                                backgroundColor={lightGreen300}
                                label="ADD"
                            />
                        </td>
                    </tr>
                </table>
            </Paper>
        );
    }
}

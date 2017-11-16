import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
import Circle from './circle.js';
import Crane from './crane.js';
import Warehouse from './warehouse.js';
import Paper from 'material-ui/Paper';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x: 200,
            y: 0
        };
        this.update = this.update.bind(this);
    }
    componentDidMount(){
        var el = ReactDOM.findDOMNode(this);
        this.warehouse = new Warehouse(el);
        this.crane = new Crane(el);
        this.warehouse.render();
        this.crane.render();
        this.timer = setInterval(this.update, 1000);
        console.log('render here');
    }
    componentDidUpdate() {
        this.crane.update(this.state);
    }
    update() {
        var data = {
            x: this.state.x + 2,
            y: 0
        };
        this.setState(data);
    }
    render() {
        return (
            <svg width={this.props.width} height={this.props.height} />
        );
    }
}

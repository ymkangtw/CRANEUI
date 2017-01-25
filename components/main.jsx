import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
import Circle from './circle.js';
import Crane from './crane.js';
import Warehouse from './warehouse.js';

export default class Main extends React.Component {
    constructor(props) {
        super(props);

    }
    componentDidMount(){
        var el = ReactDOM.findDOMNode(this);
        //this.circle = new Circle(el);
        this.warehouse = new Warehouse(el);
        this.crane = new Crane(el);

        //this.circle.render();
        this.warehouse.render();
        this.crane.render();
        console.log('render here');
    }
    render() {
        return (<svg width={this.props.width} height={this.props.height} />);
    }
}

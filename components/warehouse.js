import * as d3 from 'd3';

export default class Warehouse {
    constructor(el) {
        this.svg = d3.select(el);
    }
    render() {
        this.svg
            .append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', 640)
            .attr('height', 240)
            .attr('stroke', 'blue')
            .attr('stroke-width', 1)
            .attr('fill-opacity', 0.0);
    }
}
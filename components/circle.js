import * as d3 from 'd3';

export default class Circle {
    constructor(el) {
        this.svg = d3.select(el);
    }
    render() {
        this.svg
            .append('circle')
            .attr('cx', 100)
            .attr('cy', 100)
            .attr('r', 50)
            .attr('fill', 'steelblue');
    }
}
import * as d3 from 'd3';

export default class Crane {
    constructor(el) {
        this.svg = d3.select(el);
    }
    render() {
        this.svg
            .append('rect')
            .attr('id', 'BR')
            .attr('x', 200)
            .attr('y', 0)
            .attr('width', 40)
            .attr('height', 240)
            .attr('fill', 'steelblue');
        this.svg
            .append('rect')
            .attr('id', 'TR')
            .attr('x', 190)
            .attr('y', 40)
            .attr('width', 60)
            .attr('height', 40)
            .attr('fill', 'blue');
    }
}
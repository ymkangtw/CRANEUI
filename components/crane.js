import * as d3 from 'd3';

export default class Crane {
    constructor(el) {
        this.svg = d3.select(el);
        this.pos = {
            x: 200,
            y: 0
        };
        this.update = this.update.bind(this);
        //this.timer = setInterval(this.update, 1000);
    }
    update(data) {
        this.pos = data;
        console.log(this.pos);
        //this.svg
        //    .attr('x', this.pos.x)
        //    .attr('y', 0);

        //this.render();
        //return this.pos.x = this.pos.x + 2;
        //this.pos.y = this.pos.y;
    }
    render(data) {
        this.svg
            .append('rect')
            .attr('id', 'BR')
            //.data(this.pos)
            //.enter()
            //.attr('x', (d) => {console.log(d.x);return d.x;})
            .attr('x', this.pos.x)
            .attr('y', 0)
            .attr('width', 40)
            .attr('height', 240)
            .attr('fill', 'steelblue');
        this.svg
            .transition()
            .duration(500)
            .attr('x', this.pos.x);

        /*
        this.svg
            .append('rect')
            .attr('id', 'TR')
            .attr('x', 190)
            .attr('y', 40)
            .attr('width', 60)
            .attr('height', 40)
            .attr('fill', 'blue');
        */
        //this.update(data);
    }
}
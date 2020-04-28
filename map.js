class Map {

    constructor(opts) {
        this.selected = opts.selected;
        this.element = opts.element;
        this.color = opts.color;
        this.projection = d3.geoAlbers()
            .center([1,38.7])
            .scale(800)

        if(opts.projection) this.x = opts.projection;
        this.geoJson = opts.geoJson;

        this.draw();
    }

    draw() {
        this.width = this.element.offsetWidth;
        this.height = document.documentElement.clientHeight * 0.5 * 0.85;
        this.margin = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
        };

        if (d3.select(this.element).select('svg').empty()) {
            const svg = d3.select(this.element).append('svg');
            svg.attr('viewBox', `0 0 ${this.width} ${this.height}`)
                .attr('preserveAspectRatio', 'xMinYMid')
                .attr('width', this.width)
                .attr('height', this.height)
            
            this.plot = svg.append('g')
                .attr('transform', `translate(${this.margin.left},${this.margin.top})`);


            let zoom = d3.zoom()
                .scaleExtent([1, 8])
                .on('zoom', () => {
                    this.plot.selectAll('.state')
                        .attr('transform', d3.event.transform)
                })

            svg.call(zoom)

            this.createProjection();
            this.addStates();

        } else {
            this.addStates();
        }
        
    }

    createProjection() {
        var m = this.margin;
        this.projection
            .translate([this.width/2, this.height/2])
            .scale([Math.min((this.height - m.top - m.bottom)*2, (this.width - m.left - m.right)*1.3)])

        this.path = d3.geoPath()
            .projection(this.projection)
    }

    addStates() {
        let states = this.plot.selectAll('.state')
            .data(this.geoJson.features)

        states
            .enter()
            .append('path')
            .merge(states)
            .attr('class', 'state')
            .attr('d', this.path)
            .on('click', d => {
                let name = d.properties.name
                global.state = name;
                this.selected = global.state
            })
            .on('mousenter', d => {
                global.state.indexOf(d.properties.name) === -1
            })
            .classed('selected', d => this.selected.indexOf(d.properties.name) !== -1)
            .attr('fill', d => this.selected.indexOf(d.properties.name) !== -1 ? this.color(d.properties.name) : '#888')

    }
}
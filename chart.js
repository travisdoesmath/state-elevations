class LineChart {

    constructor(opts) {
        this.x = d => d.x;
        this.y = d => d.y;
        this.y0 = this.y;
        this.y1 = this.y;
    
        this.data = opts.data;
        this.selected = opts.selected;
        this.element = opts.element;
        this.color = opts.color;

        if(opts.x) this.x = opts.x;
        if(opts.y) this.y = opts.y;
        if(opts.y0) this.y0 = opts.y0;
        if(opts.y1) this.y1 = opts.y1;


        this.draw();
    }

    draw() {
        this.width = this.element.offsetWidth;
        this.height = document.documentElement.clientHeight * 0.5 * 0.85;
        this.margin = {
            top: 0,
            right: 20,
            bottom: 20,
            left: 40
        };

        this.element.innerHTML = '';
        const svg = d3.select(this.element).append('svg');
        svg.attr('viewBox', `0 0 ${this.width} ${this.height}`)
            .attr('preserveAspectRatio', 'xMinYMid')
            .attr('width', this.width)
            .attr('height', this.height)
        
        this.plot = svg.append('g')
            .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

        this.createScales();
        this.addLines();
        this.addAxes();
    }

    createScales() {
        const xMax = d3.max(data.map(d => +d3.max(d.data, this.x)))
        const yMin = d3.min(data.map(d => +d3.min(d.data, this.y0)))
        const yMax = d3.max(data.map(d => +d3.max(d.data, this.y1)))

        this.xScale = d3.scaleLinear()
            .range([0, this.width - this.margin.right - this.margin.left])
            .domain([0, xMax])
            .nice()

        this.yScale = d3.scaleLinear()
            .range([this.margin.bottom, this.height - this.margin.top - this.margin.bottom])
            .domain([yMax, yMin])
            .nice()

        this.line = d3.line()
            .x(d => this.xScale(this.x(d)))
            .y(d => this.yScale(this.y(d)))

        this.area = d3.area()
            .x(d => this.xScale(this.x(d)))
            .y0(d => this.yScale(this.y0(d)))
            .y1(d => this.yScale(this.y1(d)))

    }

    addAxes() {
        const xAxis = d3.axisBottom()
            .scale(this.xScale)

        const yAxis = d3.axisLeft()
            .scale(this.yScale)

        // this.plot.append("g")
        //     .attr("class", "x axis")
        //     .attr("transform", `translate(0, ${this.height - (this.margin.top + this.margin.bottom)})`)
        //     .call(xAxis)

        this.plot.append("g")
            .attr("class", "y axis")
            .call(yAxis)
    }

    addLines() {
        let y = this.y;
        let x = this.x;
        let elevations = this.plot.selectAll('.line-group')
            .data(this.data)
            .enter()
            .append('g')
            .attr('class', d => d.state)
            .classed('line-group', true)
            .classed('selected', d => this.selected.indexOf(d.state) !== -1)
            .attr('opacity', d => this.selected.indexOf(d.state) !== -1 ? 1 : 0.05)

        elevations
            .append('path')
            .attr('d', d => this.area(d.data))
            .attr('stroke', d => this.selected.indexOf(d.state) !== -1 ? this.color(d.state) : '#888')
            .attr('stroke-width', '1px')
            .attr('stroke-opacity', 0.5)
            .attr('fill', d => this.selected.indexOf(d.state) !== -1 ? this.color(d.state) : '#888')
            .attr('fill-opacity', 0.25)

        elevations
            .append('path')
            .attr('d', d => this.line(d.data))
            .attr('stroke', d => this.selected.indexOf(d.state) !== -1 ? this.color(d.state) : '#888')
            .attr('stroke-width', '2px')
            .attr('fill', 'none')
            

    }
}
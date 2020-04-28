class LineChart {

    constructor(opts) {
        this.x = d => d.x;
        this.y = d => d.y;
    
        this.data = opts.data;
        this.selected = opts.selected;
        this.element = opts.element;
        this.color = opts.color;

        if(opts.x) this.x = opts.x;
        if(opts.y) this.y = opts.y;

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
        const yMin = d3.min(data.map(d => +d3.min(d.data, this.y)))
        const yMax = d3.max(data.map(d => +d3.max(d.data, this.y)))

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
        this.plot.selectAll('.line')
            .data(this.data)
            .enter()
            .append('path')
            .attr('class', d => d.state)
            .classed('line', true)
            .classed('selected', d => this.selected.indexOf(d.state) !== -1)
            .attr('d', d => this.line(d.data))
            .attr('stroke', d => this.color(d.state))
            .attr('stroke-width', '2px')

    }
}
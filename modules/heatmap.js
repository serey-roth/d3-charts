import { 
    width, 
    height, 
    mousemove, 
    mouseleave,
    mouseover,
    tooltip,
    addTitle, 
    addDescription
} from "./misc";

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 
'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const createMatrix = (data) => {
    const matrix = [];
    const rows = Math.floor(data.length / 12);
    for (let i = 0; i < rows; i++) {
        matrix.push(data.splice(0, 12))
    }
    matrix.push(data)
    return matrix;
}

const svg = d3.select('.chart')
        .append('svg')
        .attr('viewBox', '0 0 1000 700')

export const drawHeatMap = ({ baseTemperature: base, 
    monthlyVariance: variances }) => {
    
    const matrix = createMatrix(variances.slice(0))
    const variancesExtent = d3.extent(variances, (v) => base + v.variance)
    const years = Array.from(new Set(variances.map(v => v.year)))
    const yearsExtent = d3.extent(years)

    //add description
    addTitle(svg, 'Monthly Global Land-Surface Temperature');
    addDescription(svg, `${yearsExtent[0]} - 
    ${yearsExtent[1]}<br>(base temperature of ${base}°C)`);
    
    //configure scales
    const monthsScale = d3.scaleBand()
    .domain(MONTHS)
    .range([100, height])

    const yearsScale = d3.scaleLinear()
    .domain(yearsExtent)
    .range([40, width])

    const colorsScale = d3.scaleSequential()
    .domain(variancesExtent)
    .interpolator(d3.interpolatePlasma)
    
    const move = (e) => {
        const { __data__: d } = e.target;
        const cell = d3.select(this);
        mousemove(e, `${d.year} - ${MONTHS[d.month - 1]}<br>
        ${(Number.parseFloat(d.variance) + base).toFixed(2)}°C<br>
        ${(Number.parseFloat(d.variance)).toFixed(2)}°C<br>`)
    }

    //add rows, cells and color fills
    const columns  = svg.selectAll('.column') 
        .data(matrix)
        .enter()
        .append('g')
            .classed('column', true)
            .attr('transform', (d, i) => `translate(${yearsScale(i + 1753)}, 0)`)
    
    const cells = columns.selectAll(".cell")
        .data((d) => d)
        .enter()
        .append("g")
            .attr("class", "cell")
            .attr("transform", (d) => `translate(0, ${monthsScale(MONTHS[d.month - 1])})`)
            .style('stroke', 'none')
            .on('mouseover', mouseover)
            .on('mousemove', move)
            .on('mouseleave', mouseleave)

    cells.append('rect')
            .attr('width', 5)
            .attr('height', monthsScale.bandwidth())
            .style('fill', ({ variance }) => colorsScale(variance + base))
            
    //add axes
    const xAxis = d3.axisBottom(yearsScale)
        .ticks(null, 'd')

    const yAxis = d3.axisLeft(monthsScale)
        
    svg.append('g')
        .attr('id', 'xAxis')
        .attr('transform',  `translate(0, ${height})`)
        .call(xAxis)

    svg.append('g')
        .attr('id', 'yAxis')
        .attr('transform', 'translate(40, 0)')
        .call(yAxis)

    //add color legend
    const legendTicks = d3.scaleLinear()
    .domain(variancesExtent)
    .range([0, 200])
    .nice()

    const legends = svg.append('g')
        .attr('id', 'legends')
        .attr('transform', `translate(${width - 200}, 50)`)

    legends.selectAll('rect')
    .data(d3.range(...legendTicks.range()))
    .enter()
    .append('rect')
        .attr('x', (d, i) => i)
        .attr('y', 0)
        .attr('width', 1)
        .attr('height', 10)
        .attr('fill', (d) => colorsScale(legendTicks.invert(d)));

    legends.call(d3.axisBottom(legendTicks)
        .ticks(8)
        .tickSize(15)
        .tickFormat((d) => `${d}%`));

    legends.select('path')
        .style('stroke', 'none')

    legends.selectAll('line')
        .style('stroke', 'white')
}

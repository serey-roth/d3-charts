import { 
    width, 
    height, 
    mousemove, 
    mouseleave,
    mouseover,
    addDescription,
    createGradientLegends
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

export const HeatMap = (svg, { baseTemperature: base, 
    monthlyVariance: variances }) => {

    const matrix = createMatrix(variances.slice(0))
    const variancesExtent = d3.extent(variances, (v) => base + v.variance)
    const years = Array.from(new Set(variances.map(v => v.year)))
    const yearsExtent = d3.extent(years)

    addDescription(svg, `${yearsExtent[0]} - 
    ${yearsExtent[1]}<br>(base temperature of ${base}°C)`);
    
    const monthsScale = d3.scaleBand()
    .domain(MONTHS)
    .range([100, height])

    const yearsScale = d3.scaleLinear()
    .domain(yearsExtent)
    .range([40, width])

    const colorsScale = d3.scaleSequential()
    .domain(variancesExtent)
    .interpolator(d3.interpolateRainbow)
    
    const move = (e) => {
        const { __data__: d } = e.target;
        const cell = d3.select(this);
        mousemove(e, `${d.year} - ${MONTHS[d.month - 1]}<br>
        ${(Number.parseFloat(d.variance) + base).toFixed(2)}°C<br>
        ${(Number.parseFloat(d.variance)).toFixed(2)}°C<br>`)
    }

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
            .attr("transform", (d) => 
            `translate(0, ${monthsScale(MONTHS[d.month - 1])})`)
            .style('stroke', 'none')
        .on('mouseover', mouseover)
        .on('mousemove', move)
        .on('mouseleave', mouseleave)

    const mapPromise = cells.append('rect')
        .style('fill', ({ variance }) => colorsScale(variance + base))
        .attr('width', 5)
        .transition()
            .delay(1000)
            .duration(500)
            .ease(d3.easeQuadIn)
            .attr('height', monthsScale.bandwidth())
        .end()
            
    svg.append('g')
        .attr('id', 'xAxis')
        .attr('transform',  `translate(0, ${height})`)
        .call(d3.axisBottom(yearsScale)
                .ticks(null, 'd'))

    svg.append('g')
        .attr('id', 'yAxis')
        .attr('transform', 'translate(40, 0)')
        .call(d3.axisLeft(monthsScale))

    const legendTicks = d3.scaleLinear()
    .domain(variancesExtent)
    .range([0, 200])
    .nice()

    createGradientLegends(svg, legendTicks, colorsScale, [mapPromise], `translate(${width - 200}, 50)`)
}

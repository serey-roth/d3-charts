import { 
    width, 
    height, 
    mousemove, 
    mouseleave, 
    mouseover,
} from "./misc";

const toDateUTC = (seconds) => new Date(Date.UTC(0, 0, 0, 0, 0, seconds));

const embellishChart = (svg, xScale, yScale, colors, dopingStatus) => {
    svg.append('g')
        .attr('id', 'x-axis')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale)
            .ticks(d3.timeYear.every(2)))

    svg.append('g')
        .attr('id', 'y-axis')
        .call(d3.axisLeft(yScale)
            .tickFormat(d3.timeFormat('%M:%S')))
        .transition()
            .duration(500)
            .ease(d3.easeLinear)
            .attr('transform', 'translate(70, 0)')

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Time")
        .transition()
            .duration(500)
            .ease(d3.easeLinear)
            .attr("y", 10)
            .attr("x", -500 / 2)

    //add legends
    svg.selectAll('text#legend-heading')
        .data(['Doping Allegations'])
        .enter()
        .append('text')
        .attr('x', width - 200)
        .text((d) => d)
        .transition()
            .duration(500)
            .ease(d3.easeLinear)
            .attr('y', (d, i) => height / 2 - 10 + i * 20)

    svg.selectAll('rect')
        .data(dopingStatus)
        .enter()
        .append('rect')
        .attr('x', width - 200)
        .attr('y', (d, i) => height / 2 + i * 20)
        .attr('width', 20)
        .attr('height', 20)
        .style('fill-opacity', 0.6)
        .transition()
            .duration(500)
            .ease(d3.easeLinear)
            .style('fill', (d) => colors(d))


    svg.selectAll('text#legend-text')
        .data(dopingStatus)
        .enter()
        .append('text')
        .attr('y', (d, i) => height / 2 + 15 + i * 20)
        .text((d) => d)
        .transition()
            .duration(500)
            .ease(d3.easeLinear)
            .attr('x', width - 170)
}

export const ScatterPlot = (svg, data) => {
    const dopingStatus = ['without', 'with']

    const extent = d3.extent(data, ({ Year }) => new Date(Year, 0, 1));
    const xScale = d3.scaleTime()
        .domain([new Date(extent[0].getFullYear() - 1, 0, 1), 
        new Date(extent[1].getFullYear() + 1, 0, 1)])
        .range([70, width])
        .nice()

    const yScale = d3.scaleTime()
        .domain(d3.extent(data, ({
            Seconds
        }) => toDateUTC(Seconds)))
        .range([height, 100])
        .nice()

    const colors = d3.scaleOrdinal()
        .domain(dopingStatus)
        .range(d3.schemeSet1)

    const move = (e) => {
        const { __data__: d } = e.target;
        mousemove(e, `${d.Name} ( ${d.Nationality} )<br>
            Year: ${d.Year}, Time: ${d.Time}${d.Doping && `<br><br>${d.Doping}`}`)
    }

    svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('cx', ({
            Year
        }) => xScale(new Date(Year, 0, 1)))
        .attr('cy', ({
            Seconds
        }) => yScale(toDateUTC(Seconds)))
        .style('fill', ({
            Doping
        }) =>
            Doping ? colors('with') :
                colors('without'))
        .style('fill-opacity', 0.6)
        .on('mouseover', mouseover)
        .on('mousemove', move)
        .on('mouseleave', mouseleave)
        .transition()
            .delay((d, i) => i * 50)
            .duration(300)
            .ease(d3.easeBounce)
            .attr('r', 8)
        .end()
    .then(() => embellishChart(svg, xScale, yScale, colors, dopingStatus))
    
}

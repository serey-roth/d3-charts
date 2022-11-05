import { 
    width, 
    height, 
    mousemove, 
    mouseleave, 
    mouseover, 
} from "./misc";

export const BarChart = (svg, { data }) => {
    data.forEach(item => {
        const date = new Date(item[0]);
        const year = date.getFullYear();
        const quarter = Math.floor((date.getMonth() + 3) / 3) / 4;
        item[0] = year + quarter;
    })

    const xScale = d3.scaleLinear()
    .domain([d3.min(data, (d) => Number.parseFloat(d[0])), 
    d3.max(data, (d) => Number.parseFloat(d[0]))])
    .range([50, width])

    const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, (d) => Number.parseFloat(d[1]))])
    .range([height, 0])
    .nice()

    const move = (e) => {
        const { __data__: d } = e.target;
        mousemove(e, `${Math.floor(d[0])} Q${(d[0] - Math.floor(d[0])) * 4 + 1} <br> 
        $${d[1]} B`)
    }

    svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
        .attr('class', 'bar')
        .attr('x', (d) => xScale(Number.parseFloat(d[0])))
        .attr('y', (d) => yScale(Number.parseFloat(d[1])))
        .attr('height', (d) => height - yScale(Number.parseFloat(d[1])))
        .attr('fill', 'orange')
    .on('mouseover', mouseover)
    .on('mousemove', move)
    .on('mouseleave', mouseleave)
    .transition()
        .delay((d, i) => i * 5)
        .ease(d3.easeLinear)
        .attr('width', 2.7)

    svg.append('g')
        .attr('id', 'x-axis')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale).ticks(null, 'd'))

    svg.append('g')
        .attr('id', 'y-axis')
        .attr('transform', 'translate(50, 0)')
        .call(d3.axisLeft(yScale))
    
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 60)
        .attr("x", -500/2)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Gross Domestic Product"); 
}


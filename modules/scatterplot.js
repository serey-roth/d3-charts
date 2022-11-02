import { 
    width, 
    height, 
    mousemove, 
    mouseleave, 
    mouseover,
    addDescription,
    addTitle 
} from "./misc";

const toDateUTC = (seconds) => new Date(Date.UTC(0, 0, 0, 0, 0, seconds));

const svg = d3.select('.chart')
    .append('svg')
     .attr('viewBox', '0 0 1000 700')

addTitle(svg, 'Doping in Professional Bicycle Racing')
addDescription(svg, "35 Fastest Times Up Alpe d'Huez")

export const drawScatterPlot = (data) => {
        const dopingStatus = ['without', 'with']

        //configure scales
        const xScale = d3.scaleTime()
        .domain(d3.extent(data, ({ Year }) => new Date(Year - 1, 0, 1)))
        .range([70, width])
        .nice()

        const yScale = d3.scaleTime()
        .domain(d3.extent(data, ({ Seconds }) => toDateUTC(Seconds)))
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
            .attr('cx', ({ Year }) => xScale(new Date(Year - 1, 0, 1)))
            .attr('cy', ({ Seconds }) => yScale(toDateUTC(Seconds)))
            .attr('r', 8)
            .style('fill', ({ Doping }) => 
                Doping ? colors('with') : 
                colors('without'))
            .style('stroke', 'black')
            .style('fill-opacity', 0.6)
        .on('mouseover', mouseover)
        .on('mousemove', move)
        .on('mouseleave', mouseleave)

        //add axes
        svg.append('g')
            .attr('id', 'x-axis')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(xScale)
                    .ticks(d3.timeYear.every(2)))

        svg.append('g')
            .attr('id', 'y-axis')
            .attr('transform', 'translate(70, 0)')
            .call(d3.axisLeft(yScale)
                    .tickFormat(d3.timeFormat('%M:%S')))
        
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 10)
            .attr("x", -500/2)
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Time"); 

        //add legends
        svg.selectAll('text#legend-heading')
            .data(['Doping Allegations'])
            .enter()
            .append('text')
                .attr('x', width - 200)
                .attr('y', (d, i) => 240 + i * 20)
                .text((d) => d)

        svg.selectAll('rect')
        .data(dopingStatus)
        .enter()
        .append('rect')
            .attr('x', width - 200)
            .attr('y', (d, i) => 250 + i * 20)
            .attr('width', 20)
            .attr('height', 20)
            .style('fill', (d) => colors(d))
            .style('fill-opacity', 0.6)
            
        svg.selectAll('text#legend-text')
            .data(dopingStatus)
            .enter()
            .append('text')
                .attr('x', width - 170)
                .attr('y', (d, i) => 265 + i * 20)
                .text((d) => d)

}



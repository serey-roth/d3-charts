export const margin = { top: 10, left: 10 }

export const width = 1000 - margin.left * 2;

export const height = 850 - margin.top * 2;

export const tooltip = d3.select('.chart')
    .append('div')
        .attr('class', 'tooltip')


export const mousemove = (e, html) => {
    tooltip.html(html)
        .style('left', e.pageX + 20 + 'px')
        .style('top', e.pageY - 5 + 'px')
}

export const mouseover = function(e) {
    tooltip.style('opacity', 1)
        .style('visibility', 'visible')
    d3.select(this)
        .style('stroke', 'black')
        .style('stroke-width', 1)
}

export const mouseleave = function(e) {
    tooltip.style('opacity', 0)
        .style('visibility', 'hidden')
    d3.select(this)
        .style('stroke', 'none')
}

export const addTitle = (svg, title) => {
    svg.append('foreignObject')
            .attr('x', (d) => 0)
            .attr('y', (d) => 0)
            .attr('width', (d) => 1000)
            .attr('height', (d) => 50)
        .append('xhtml:h1')
            .attr('class', 'title')
            .text(title)
}

export const addDescription = (svg, description) => {
    svg.append('foreignObject')
            .attr('x', (d) => 0)
            .attr('y', (d) => 50)
            .attr('width', (d) => 1000)
            .attr('height', (d) => 50)
        .append('xhtml:p')
            .attr('class', 'description')
            .html(description)
}

export const createGradientLegends = (svg, legendTicks, colorsScale, promises,
    coordinates='translate(700, 100)') => {
    const legends = svg.append('g')
        .attr('id', 'legends')
        .attr('transform', coordinates)
    
    Promise.all(promises)
    .then(() => {
        legends.selectAll('rect')
            .data(d3.range(...legendTicks.range()))
            .enter()
            .append('rect')
                .attr('width', 1)
                .attr('height', 10)
                .attr('fill', (d) => colorsScale(legendTicks.invert(d)))
                .transition()
                    .duration(1000)
                    .ease(d3.easeQuadIn)
                    .attr('x', (d, i) => i)
                    .attr('y', 0)

        legends.call(d3.axisBottom(legendTicks)
            .ticks(5)
            .tickSize(15)
            .tickFormat((d) => `${d}%`));
            
        legends.select('path')
            .style('stroke', 'none')

        legends.selectAll('line')
            .style('stroke', 'black')
    })
}
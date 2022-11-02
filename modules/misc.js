export const margin = { top: 10, left: 10 }

export const width = 1000 - margin.left * 2;

export const height = 650 - margin.top * 2;

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
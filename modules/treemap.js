import { margin, width, height, mouseleave, mouseover, addTitle, addDescription, mousemove } from "./misc";

const svg = d3.select('.chart')
.append('svg')
 .attr('viewBox', '0 0 1000 700');

addTitle(svg, 'Video Games Sales')
addDescription(svg, 'Top 100 Most Sold Video Games Grouped by Platform')

const map = svg.append('g')
    .classed('map', true)
    .attr('transform', `translate(${margin.left}, 140)`)

const createLegends = (svg, names, colorsScale) => {
    svg.selectAll('rect')
        .data(names)
        .enter()
        .append('rect')
            .attr('x', (d, i) => i * 45 + 80)
            .attr('y', 0)
            .attr('width', 50)
            .attr('height', 10)
            .attr('fill', (d) => colorsScale(d))
            .style('fill-opacity', 0.6)

    svg.selectAll('text')
        .data(names)
        .enter()
        .append('text')
            .attr('x', (d, i) => i * 45 + 90)
            .attr('y', 20)
            .text((d) => d) 
                .style('font-size', '10px')
            
}

export const drawTreeMap = (data) => {
    
    const root = d3.hierarchy(data).sum((d) => d.value);
    
    d3.treemap()
        .size([width, height - 140])
        .paddingInner(2)
        (root)

    const categories = data.children.map(d => d.name);

    const colors = d3.scaleOrdinal()
    .domain(categories)
    .range(d3.schemeRdYlBu[9])

    const move = function(e) {
        const { __data__: d } = e.target;
        mousemove(e, `Name: <strong>${d.data.name}</strong><br>
        Category: ${d.data.category}<br>
        Value: ${d.data.value}<br>`)
    }

    const legends = svg.append('g')
        .classed('legends', true)
        .attr('transform', `translate(${margin.left}, 100)`)

    createLegends(legends, categories, colors);

    const groups = map.selectAll('.group')
        .data(root.children)
        .enter()
        .append('g')
            .classed('group', true)

    groups.selectAll('foreignObject')
        .data((d) => d.leaves())
        .enter()
        .append('foreignObject')
            .attr('x', (d) => d.x0)
            .attr('y', (d) => d.y0)
            .attr('width', (d) => d.x1 - d.x0)
            .attr('height', (d) => (d.y1 - d.y0))
        .append('xhtml:div')
            .attr('class', 'label')
        .html((d) => `${d.data.name}`)

    const tiles = groups.selectAll('.tile')
        .data((d) => d.leaves())
        .enter()
        .append('rect')
            .attr('x', (d) => d.x0)
            .attr('y', (d) => d.y0)
            .attr('width', (d) => d.x1 - d.x0)
            .attr('height', (d) => d.y1 - d.y0)
            .style('fill', (d) => colors(d.parent.data.name))
            .style('fill-opacity', 0.6)
        .on('mouseover', mouseover)
        .on('mousemove', move)
        .on('mouseleave', mouseleave)
        
    
}

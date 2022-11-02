import { addDescription, addTitle, mousemove ,mouseleave, mouseover } from "./misc";

const svg = d3.select('.chart')
    .append('svg')
        .attr('viewBox', '0 0 1000 700')

addTitle(svg, 'United States Educational Attainment')
addDescription(svg, `Percentage of adults age 25 and older with
a bachelor's degree or higher (2010 - 2014)`)

export const drawChoropleth = (education, usTopoJson) => {
    //configure path and projection for map
    const countiesGeoJson = topojson.feature(usTopoJson, 
        usTopoJson.objects.counties)

    const counties = countiesGeoJson.features.sort((a, b) => 
        a.id < b.id ? -1 : (a.id === b.id ? 0: 1));

    const path = d3.geoPath();

    const colorsScale = d3.scaleLinear()
    .domain(d3.extent(education, (e) => e.bachelorsOrHigher))
    .range(['white', 'indigo'])

    const move = (e) => {
        const { attributes } = e.target;
        const educationInfo = education[Number.parseInt(attributes[3].value)];
        mousemove(e, `${educationInfo.area_name}, ${educationInfo.state}:
        ${educationInfo.bachelorsOrHigher}%`);
    }
    
    svg.append('g')
            .attr('id', 'counties')
            .attr('transform', 'translate(0, 100)')
        .selectAll('path')
        .data(counties)
        .enter()
        .append('path')
            .classed('county', true)
            .attr('data-fips', (d) => d.id)
            .attr('data-education', (d, i) => education[i].bachelorsOrHigher)
            .attr('index', (d, i) => i)
            .attr('d', path)
            .style('fill', (d, i) => colorsScale(education[i].bachelorsOrHigher))
            .style('stroke', 'white')
            .style('stroke-dasharray', '1,1')
            .style('stroke-width', 0.5)
        .on('mouseover', mouseover)
        .on('mousemove', move)
        .on('mouseleave', mouseleave)

    //add borders
    svg.append('g')
            .attr('id', 'borders')
            .attr('transform', 'translate(0, 100)')
        .append('path')
        .attr('d', path(topojson.mesh(usTopoJson, 
            usTopoJson.objects.states, 
            function(a, b) { return a !== b; })))
        .style('fill', 'none')
        .style('stroke', 'white')
        .style('stroke-width', 1.5)
        
    //add color legend
    const legendTicks = d3.scaleLinear()
    .domain(d3.extent(education, (e) => e.bachelorsOrHigher))
    .range([0, 200])
    .nice()

    const legends = svg.append('g')
        .attr('id', 'legends')
        .attr('transform', 'translate(700, 100)')

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
        .ticks(5)
        .tickSize(15)
        .tickFormat((d) => `${d}%`));

    legends.select('path')
        .style('stroke', 'none')

    legends.selectAll('line')
        .style('stroke', 'black')

}

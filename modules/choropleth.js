import { mousemove ,mouseleave, mouseover, createGradientLegends } from "./misc";

export const Choropleth = (svg, education, usTopoJson) => {
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
    
    const map = svg.append('g')
        .attr('id', 'counties')
        .attr('transform', 'translate(0, 150)')
        .selectAll('path')
        .data(counties)
        .enter()
        .append('path')
            .classed('county', true)
            .attr('data-fips', (d) => d.id)
            .attr('data-education', (d, i) => education[i].bachelorsOrHigher)
            .attr('index', (d, i) => i)
            .style('stroke', 'white')
            .style('stroke-dasharray', '1,1')
            .style('stroke-width', 0.5)     
        .on('mouseover', mouseover)
        .on('mousemove', move)
        .on('mouseleave', mouseleave)
    
    const mapPromise = map.transition()
        .delay((d, i) => i * 2)
        .ease(d3.easePolyIn)
        .attr('d', path)
        .style('fill', (d, i) => colorsScale(education[i].bachelorsOrHigher))   
        .end()    

    //add borders
    const borderPromise = svg.append('g')
            .attr('id', 'borders')
            .attr('transform', 'translate(0, 150)')
        .append('path')
        .style('fill', 'none')
        .style('stroke', 'white')
        .style('stroke-width', 1.5)
        .transition()
            .delay((d, i) => i * 2)
            .ease(d3.easePolyIn)
            .attr('d', path(topojson.mesh(usTopoJson, 
            usTopoJson.objects.states, 
            function(a, b) { return a !== b; })))  
        .end()

    
    const legendTicks = d3.scaleLinear()
        .domain(d3.extent(education, (e) => e.bachelorsOrHigher))
        .range([0, 200])
        .nice()
    
    createGradientLegends(svg, legendTicks, colorsScale, [mapPromise, borderPromise]);
}

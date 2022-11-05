import './style.css'
import { BarChart } from "../modules/barchart";
import { HeatMap } from "../modules/heatmap";
import { TreeMap } from "../modules/treemap";
import { ScatterPlot } from "../modules/scatterplot";
import { Choropleth } from "../modules/choropleth";

import { width, height, addTitle, addDescription } from '../modules/misc';
const data = [
    {   type: 'barchart',
        url: ['https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'],
        title: 'United States GDP', 
    },
    {   
        type: 'scatterplot', 
        url: ['https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json'],
        title: 'Doping in Professional Bicycle Racing',
        description: "35 Fastest Times Up Alpe d'Huez"
    },
    {
        type: 'choropleth',
        url: [
            'https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json',
            'https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json'
        ],
        title: 'United States Educational Attainment',
        description: `Percentage of adults age 25 and older with
        a bachelor's degree or higher (2010 - 2014)`,
    },
    {   
        type: 'heatmap', 
        url: ['https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json'],
        title: 'Monthly Global Land-Surface Temperature',
    },
    {   
        type: 'treemap', 
        url: ['https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json'],
        title: 'Video Games Sales',
        description: 'Top 100 Most Sold Video Games Grouped by Platform',
    },
]

const components = [
    BarChart,
    ScatterPlot,
    Choropleth,
    HeatMap,
    TreeMap,
]

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
}
  
const handleIntersect = (entries, observer) => {
    if (entries[0].isIntersecting) {
        drawChart(data[0]);
    }
}

const  observer = new IntersectionObserver(handleIntersect, options);

const drawChart = (chart) => {
    if (data.length === 0) return;
    d3.select('.chart')
        .append('h1')
        .attr('class', 'chart-type')
        .text(`${data[0].type}`)

    const promise = Promise.all(chart.url.map(u => d3.json(u)));
        
    promise.then(response => {
        const svg = d3.select('.chart')
            .append('svg')
            .attr('viewBox', `0 0 ${width + 50} ${height + 50}`)

        if (data[0].hasOwnProperty('title')) 
            addTitle(svg, data[0].title)   
        if (data[0].hasOwnProperty('description')) 
            addDescription(svg, data[0].description)

        components[0](svg, ...response);

        const target = document.getElementsByClassName('target')[0];

        if (target) {
            document.getElementsByClassName('chart')[0].removeChild(target);
            document.getElementsByClassName('chart')[0].appendChild(target);
        } else {
            const div = document.createElement('div');
            div.classList.add('target');
            document.getElementsByClassName('chart')[0].appendChild(div);
            observer.observe(div);
        }

        data.shift();
        components.shift();

        if (data.length === 0) {
            observer.disconnect();
        }
    })
}

document.addEventListener('DOMContentLoaded', () => drawChart(data[0]));
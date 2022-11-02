import './style.css'
import { drawBarChart } from "../modules/barchart";
import { drawHeatMap } from "../modules/heatmap";
import { drawTreeMap } from "../modules/treemap";
import { drawScatterPlot } from "../modules/scatterplot";
import { drawChoropleth } from "../modules/choropleth";

const barData = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';
const educationData = 'https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json'
const countiesData = 'https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json'
const heatmapData = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json'
const treemapData = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json'
const scatterPlotData = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json';

Promise
.all([
    d3.json(barData), 
    d3.json(scatterPlotData),
    d3.json(educationData),
    d3.json(countiesData),
    d3.json(heatmapData),
    d3.json(treemapData) 
])
.then(([{ data }, scatter, education, counties, heatmap, treemap]) => {
    drawBarChart(data);
    drawScatterPlot(scatter);
    drawChoropleth(education, counties);
    drawHeatMap(heatmap);
    drawTreeMap(treemap);
})
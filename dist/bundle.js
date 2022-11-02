/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./modules/barchart.js":
/*!*****************************!*\
  !*** ./modules/barchart.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"drawBarChart\": () => (/* binding */ drawBarChart)\n/* harmony export */ });\n/* harmony import */ var _misc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./misc */ \"./modules/misc.js\");\n\n\nconst svg = d3.select('.barchart');\n\nconst drawBarChart = (data) => {\n    data.forEach(item => {\n        const date = new Date(item[0]);\n        const year = date.getFullYear();\n        const quarter = Math.floor((date.getMonth() + 3) / 3) / 4;\n        item[0] = year + quarter;\n    })\n\n    const xScale = d3.scaleLinear()\n    .domain([d3.min(data, (d) => Number.parseFloat(d[0])), \n    d3.max(data, (d) => Number.parseFloat(d[0]))])\n    .range([50, _misc__WEBPACK_IMPORTED_MODULE_0__.width])\n\n    const yScale = d3.scaleLinear()\n    .domain([0, d3.max(data, (d) => Number.parseFloat(d[1]))])\n    .range([_misc__WEBPACK_IMPORTED_MODULE_0__.height, 0])\n    .nice()\n\n    const move = (e) => {\n        const { __data__: d } = e.target;\n        (0,_misc__WEBPACK_IMPORTED_MODULE_0__.mousemove)(`${Math.floor(d[0])} Q${(d[0] - Math.floor(d[0])) * 4 + 1} <br> \n        $${d[1]} B`)\n    }\n\n    svg.selectAll('rect')\n    .data(data)\n    .enter()\n    .append('rect')\n        .attr('class', 'bar')\n        .attr('x', (d) => xScale(Number.parseFloat(d[0])))\n        .attr('y', (d) => yScale(Number.parseFloat(d[1])))\n        .attr('width', 2.7)\n        .attr('height', (d) => _misc__WEBPACK_IMPORTED_MODULE_0__.height - yScale(Number.parseFloat(d[1])))\n    .on('mouseover', _misc__WEBPACK_IMPORTED_MODULE_0__.mouseover)\n    .on('mousemove', move)\n    .on('mouseleave', _misc__WEBPACK_IMPORTED_MODULE_0__.mouseleave)\n\n    svg.append('g')\n        .attr('id', 'x-axis')\n        .attr('transform', `translate(0, ${_misc__WEBPACK_IMPORTED_MODULE_0__.height})`)\n        .call(d3.axisBottom(xScale).ticks(null, 'd'))\n\n    svg.append('g')\n        .attr('id', 'y-axis')\n        .attr('transform', 'translate(50, 0)')\n        .call(d3.axisLeft(yScale))\n    \n    svg.append(\"text\")\n        .attr(\"transform\", \"rotate(-90)\")\n        .attr(\"y\", 60)\n        .attr(\"x\", -500/2)\n        .attr(\"dy\", \"1em\")\n        .style(\"text-anchor\", \"middle\")\n        .text(\"Gross Domestic Product\"); \n}\n\n\n\n//# sourceURL=webpack://charts/./modules/barchart.js?");

/***/ }),

/***/ "./modules/choropleth.js":
/*!*******************************!*\
  !*** ./modules/choropleth.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"drawChoropleth\": () => (/* binding */ drawChoropleth)\n/* harmony export */ });\n/* harmony import */ var _misc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./misc */ \"./modules/misc.js\");\n\n\nconst svg = d3.select('.choropleth');\n\nconst drawChoropleth = (education, usTopoJson) => {\n    //configure path and projection for map\n    const countiesGeoJson = topojson.feature(usTopoJson, usTopoJson.objects.counties)\n\n    const counties = countiesGeoJson.features.sort((a, b) => a.id < b.id ? -1 : (\n        a.id === b.id ? 0: 1));\n\n    const path = d3.geoPath();\n\n    const colors = d3.scaleLinear()\n    .domain(d3.extent(education, (e) => e.bachelorsOrHigher))\n    .range(['white', 'purple'])\n\n    const move = (e) => {\n        const { attributes } = e.target;\n        const educationInfo = education[Number.parseInt(attributes[3].value)];\n        mousemove(`${educationInfo.area_name}, ${educationInfo.state}:\n        ${educationInfo.bachelorsOrHigher}%`);\n    }\n    \n    svg.append('g')\n        .attr('id', 'counties')\n        .selectAll('path')\n        .data(counties)\n        .enter()\n        .append('path')\n            .classed('county', true)\n            .attr('data-fips', (d) => d.id)\n            .attr('data-education', (d, i) => education[i].bachelorsOrHigher)\n            .attr('index', (d, i) => i)\n            .attr('d', path)\n            .style('fill', (d, i) => colors(education[i].bachelorsOrHigher))\n            .style('stroke', 'white')\n            .style('stroke-dasharray', '1,1')\n            .style('stroke-width', 0.5)\n        .on('mouseover', _misc__WEBPACK_IMPORTED_MODULE_0__.mouseover)\n        .on('mousemove', move)\n        .on('mouseleave', _misc__WEBPACK_IMPORTED_MODULE_0__.mouseleave)\n\n    //add borders\n    svg.append('g')\n        .attr('id', 'borders')\n        .append('path')\n        .attr('d', path(topojson.mesh(usTopoJson, \n            usTopoJson.objects.states, \n            function(a, b) { return a !== b; })))\n        .style('fill', 'none')\n        .style('stroke', 'white')\n        .style('stroke-width', 1.5)\n        \n    //add color legend\n    const legendTicks = d3.scaleLinear()\n    .domain(d3.extent(education, (e) => e.bachelorsOrHigher))\n    .range([0, 150])\n    .nice()\n\n    const legends = svg.append('g')\n        .attr('id', 'legends')\n        .attr('transform', 'translate(700, 50)')\n\n    ;(0,_misc__WEBPACK_IMPORTED_MODULE_0__.createColorGradient)(legends, colors)\n\n    legends.call(d3.axisBottom(legendTicks)\n        .ticks(5)\n        .tickSize(15)\n        .tickFormat((d) => `${d}%`));\n\n    legends.select('path')\n        .style('stroke', 'none')\n\n    legends.selectAll('line')\n        .style('stroke', 'black')\n\n\n    const footer = d3.select('.choropleth').append('div')\n    \n    footer\n    .append('p')\n        .text('Source: ')  \n    d3.select('.footer')\n    \n    \n    footer\n    .append('a')\n        .attr('href', 'https://www.ers.usda.gov/data-products/county-level-data-sets/download-data.aspx')\n        .text('US Economic Reserve Service')\n}\n\n\n//# sourceURL=webpack://charts/./modules/choropleth.js?");

/***/ }),

/***/ "./modules/heatmap.js":
/*!****************************!*\
  !*** ./modules/heatmap.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"drawHeatMap\": () => (/* binding */ drawHeatMap)\n/* harmony export */ });\n/* harmony import */ var _misc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./misc */ \"./modules/misc.js\");\n\n\nconst MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', \n'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']\n\nconst createMatrix = (data) => {\n    const matrix = [];\n    const rows = Math.floor(data.length / 12);\n    for (let i = 0; i < rows; i++) {\n        matrix.push(data.splice(0, 12))\n    }\n    matrix.push(data)\n    return matrix;\n}\n\nconst svg = d3.select('.heatmap');\n\nconst drawHeatMap = ({ baseTemperature: base, \n    monthlyVariance: variances }) => {\n    \n    const matrix = createMatrix(variances.slice(0))\n    const variancesExtent = d3.extent(variances, (v) => base + v.variance)\n    const years = Array.from(new Set(variances.map(v => v.year)))\n    const yearsExtent = d3.extent(years)\n\n    //add description\n    d3.select('.container-heatmap')\n        .append('p')\n            .attr('class', 'description')\n            .html(`${yearsExtent[0]} - ${yearsExtent[1]}<br>(base temperature of ${base}°C)`)\n    \n    //configure scales\n    const monthsScale = d3.scaleBand()\n    .domain(MONTHS)\n    .range([0, 560])\n\n    const yearsScale = d3.scaleLinear()\n    .domain(yearsExtent)\n    .range([40, 990])\n\n    const colorsScale = d3.scaleSequential()\n    .domain(variancesExtent)\n    .interpolator(d3.interpolatePlasma)\n    \n    const move = (e) => {\n        const { __data__: d } = e.target;\n        const cell = d3.select(undefined);\n        (0,_misc__WEBPACK_IMPORTED_MODULE_0__.mousemove)(`${cell.attr('data-year')} - ${d}<br>\n        ${(Number.parseFloat(cell.attr('data-variance')) + base).toFixed(2)}°C<br>\n        ${(Number.parseFloat(cell.attr('data-variance'))).toFixed(2)}°C<br>`)\n    }\n\n    //add rows, cells and color fills\n    const columns  = svg.selectAll('.column') \n        .data(matrix)\n        .enter()\n        .append('g')\n            .classed('column', true)\n            .attr('transform', (d, i) => `translate(${yearsScale(i + 1753)}, 0)`)\n    \n    const cells = columns.selectAll(\".cell\")\n        .data(MONTHS)\n        .enter()\n        .append(\"g\")\n            .attr(\"class\", \"cell\")\n            .attr(\"transform\", (d) => `translate(0, ${monthsScale(d)})`)\n        .on('mouseover', _misc__WEBPACK_IMPORTED_MODULE_0__.mouseover)\n        .on('mousemove', move)\n        .on('mouseleave', _misc__WEBPACK_IMPORTED_MODULE_0__.mouseleave)\n\n    cells.append('rect')\n            .attr('width', 3.5)\n            .attr('height', monthsScale.bandwidth())\n\n    columns.selectAll('.cell')\n        .data((d) => d)\n            .attr('data-variance', ({ variance }) => variance)\n            .attr('data-year', ({ year }) => year)\n            .attr('data-month', ({ month }) => month)\n            .style('fill', ({ variance }) => colorsScale(variance + base))\n\n\n    //add axes\n    const xAxis = d3.axisBottom(yearsScale)\n        .ticks(null, 'd')\n\n    const yAxis = d3.axisLeft(monthsScale)\n        \n    svg.append('g')\n        .attr('id', 'xAxis')\n        .attr('transform', 'translate(0, 560)')\n        .call(xAxis)\n\n    svg.append('g')\n        .attr('id', 'yAxis')\n        .attr('transform', 'translate(40, 0)')\n        .call(yAxis)\n\n    //add color legend\n    const legendTicks = d3.scaleLinear()\n    .domain(variancesExtent)\n    .range([0, 200])\n    .nice()\n\n    const legends = svg.append('g')\n        .attr('id', 'legends')\n        .attr('transform', 'translate(50, 590)')\n\n    ;(0,_misc__WEBPACK_IMPORTED_MODULE_0__.createColorGradient)(legends, colorsScale)\n\n    legends.call(d3.axisBottom(legendTicks)\n        .ticks(8)\n        .tickSize(15)\n        .tickFormat((d) => `${d}%`));\n\n    legends.select('path')\n        .style('stroke', 'none')\n\n    legends.selectAll('line')\n        .style('stroke', 'white')\n}\n\n\n//# sourceURL=webpack://charts/./modules/heatmap.js?");

/***/ }),

/***/ "./modules/misc.js":
/*!*************************!*\
  !*** ./modules/misc.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createColorGradient\": () => (/* binding */ createColorGradient),\n/* harmony export */   \"height\": () => (/* binding */ height),\n/* harmony export */   \"margin\": () => (/* binding */ margin),\n/* harmony export */   \"mouseleave\": () => (/* binding */ mouseleave),\n/* harmony export */   \"mousemove\": () => (/* binding */ mousemove),\n/* harmony export */   \"mouseover\": () => (/* binding */ mouseover),\n/* harmony export */   \"setUp\": () => (/* binding */ setUp),\n/* harmony export */   \"width\": () => (/* binding */ width)\n/* harmony export */ });\nconst margin = { top: 10, left: 10 }\n\nconst width = 1000 - margin.left * 2;\n\nconst height = 650 - margin.top * 2;\n\nconst tooltip = d3.select('.chart')\n    .append('div')\n        .attr('class', 'tooltip')\n\nconst mouseover = (e) => {\n    tooltip.style('opacity', 1)\n        .style('visibility', 'visible')\n    d3.select(undefined)\n        .style('stroke', 'rgb(0, 0, 255)')\n        .style('stroke-width', 1.5)\n}\n\nconst mousemove = (e, html) => {\n    tooltip.html(html)\n        .style('left', e.pageX + 10 + 'px')\n        .style('top', e.pageY + 'px')\n}\n\nconst mouseleave = (e) => {\n    tooltip.style('opacity', 0)\n        .style('visibility', 'hidden')\n    d3.select(undefined)\n        .style('stroke', 'white')\n        .style('stroke-width', 0.5)\n}\n\nconst createColorGradient = (svg, colorScale) => {\n    //Append a defs (for definition) element to your SVG\n    const defs = svg.append('defs');\n\n    //Append a linearGradient element to the defs and give it a unique id\n    const linearGradient = defs.append('linearGradient')\n        .attr('id', 'linear-gradient');\n\n    //Horizontal gradient\n    linearGradient\n        .attr('x1', '0%')\n        .attr('y1', '0%')\n        .attr('x2', '100%')\n        .attr('y2', '0%');\n\n    //Append multiple color stops by using D3's data/enter step\n    linearGradient.selectAll('stop')\n        .data(colorScale.range() )\n        .enter().append('stop')\n        .attr('offset', (d, i) => i / (colorScale.range().length - 1))\n        .attr('stop-color', function(d) { return d; });\n    \n    svg.append('rect')\n        .attr('x', 0)\n        .attr('y', 0)\n        .attr('width', 150)\n        .attr('height', 10)\n        .style('fill', 'url(#linear-gradient)')\n    \n}\nconst setUp = () => {\n    (['barchart', 'scatterplot', 'choropleth', 'heatmap', 'treemap'])\n    .forEach(name => {\n        d3.select('.chart')            \n        .append('svg')\n            .attr('viewBox', '0 0 1000 700')\n            .attr('class', name)\n    })\n}\n\n//# sourceURL=webpack://charts/./modules/misc.js?");

/***/ }),

/***/ "./modules/scatterplot.js":
/*!********************************!*\
  !*** ./modules/scatterplot.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"drawScatterPlot\": () => (/* binding */ drawScatterPlot)\n/* harmony export */ });\n/* harmony import */ var _misc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./misc */ \"./modules/misc.js\");\n\n\nconst toDateUTC = (seconds) => new Date(Date.UTC(0, 0, 0, 0, 0, seconds));\n\nconst svg = d3.select('.scatterplot');\n\nconst drawScatterPlot = (data) => {\n        const dopingStatus = ['without', 'with']\n\n        //configure scales\n        const xScale = d3.scaleTime()\n        .domain(d3.extent(data, ({ Year }) => new Date(Year - 1, 0, 1)))\n        .range([70, _misc__WEBPACK_IMPORTED_MODULE_0__.width])\n        .nice()\n\n        const yScale = d3.scaleTime()\n        .domain(d3.extent(data, ({ Seconds }) => toDateUTC(Seconds)))\n        .range([_misc__WEBPACK_IMPORTED_MODULE_0__.height, 0])\n        .nice()\n\n        const colors = d3.scaleOrdinal()\n        .domain(dopingStatus)\n        .range(d3.schemeSet1)\n\n        const move = (e) => {\n            const { __data__: d } = e.target;\n            (0,_misc__WEBPACK_IMPORTED_MODULE_0__.mousemove)(`${d.Name} ( ${d.Nationality} )<br>\n            Year: ${d.Year}, Time: ${d.Time}${d.Doping && `<br><br>${d.Doping}`}`)\n        }\n        \n        svg.selectAll('circle')\n        .data(data)\n        .enter()\n        .append('circle')\n            .attr('class', 'dot')\n            .attr('cx', ({ Year }) => xScale(new Date(Year - 1, 0, 1)))\n            .attr('cy', ({ Seconds }) => yScale(toDateUTC(Seconds)))\n            .attr('r', 8)\n            .style('fill', ({ Doping }) => \n                Doping ? colors('with') : \n                colors('without'))\n        .on('mouseover', _misc__WEBPACK_IMPORTED_MODULE_0__.mouseover)\n        .on('mousemove', move)\n        .on('mouseleave', _misc__WEBPACK_IMPORTED_MODULE_0__.mouseleave)\n\n        //add axes\n        svg.append('g')\n            .attr('id', 'x-axis')\n            .attr('transform', `translate(0, ${_misc__WEBPACK_IMPORTED_MODULE_0__.height})`)\n            .call(d3.axisBottom(xScale)\n                    .ticks(d3.timeYear.every(2)))\n\n        svg.append('g')\n            .attr('id', 'y-axis')\n            .attr('transform', 'translate(70, 0)')\n            .call(d3.axisLeft(yScale)\n                    .tickFormat(d3.timeFormat('%M:%S')))\n        \n        svg.append(\"text\")\n            .attr(\"transform\", \"rotate(-90)\")\n            .attr(\"y\", 10)\n            .attr(\"x\", -500/2)\n            .attr(\"dy\", \"1em\")\n            .style(\"text-anchor\", \"middle\")\n            .text(\"Time\"); \n\n        //add legends\n        svg.selectAll('text#legend-heading')\n            .data(['Doping Allegations'])\n            .enter()\n            .append('text')\n                .attr('x', 580)\n                .attr('y', (d, i) => 240 + i * 20)\n                .text((d) => d)\n\n        svg.selectAll('rect')\n        .data(dopingStatus)\n        .enter()\n        .append('rect')\n            .attr('x', 600)\n            .attr('y', (d, i) => 250 + i * 20)\n            .attr('width', 20)\n            .attr('height', 20)\n            .style('fill', (d) => colors(d))\n            .style('fill-opacity', 0.6)\n            \n        svg.selectAll('text#legend-text')\n            .data(dopingStatus)\n            .enter()\n            .append('text')\n                .attr('x', 625)\n                .attr('y', (d, i) => 265 + i * 20)\n                .text((d) => d)\n\n}\n\n\n\n\n//# sourceURL=webpack://charts/./modules/scatterplot.js?");

/***/ }),

/***/ "./modules/treemap.js":
/*!****************************!*\
  !*** ./modules/treemap.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"drawTreeMap\": () => (/* binding */ drawTreeMap)\n/* harmony export */ });\n/* harmony import */ var _misc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./misc */ \"./modules/misc.js\");\n\n\nconst svg = d3.select('.treemap');\n\nconst map = svg.append('g')\n    .classed('map', true)\n    .attr('transform', `translate(${_misc__WEBPACK_IMPORTED_MODULE_0__.margin.left}, ${_misc__WEBPACK_IMPORTED_MODULE_0__.margin.top * 5})`)\n\nconst createLegends = (svg, names, colorsScale) => {\n    svg.selectAll('rect')\n        .data(names)\n        .enter()\n        .append('rect')\n            .attr('x', (d, i) => i * 45 + 80)\n            .attr('y', 0)\n            .attr('width', 50)\n            .attr('height', 10)\n            .attr('fill', (d) => colorsScale(d));\n\n    svg.selectAll('text')\n        .data(names)\n        .enter()\n        .append('text')\n            .attr('x', (d, i) => i * 45 + 90)\n            .attr('y', 20)\n            .text((d) => d) \n                .style('font-size', '10px')\n            \n}\n\nconst drawTreeMap = (data) => {\n    const root = d3.hierarchy(data).sum((d) => d.value);\n    \n    d3.treemap()\n        .size([_misc__WEBPACK_IMPORTED_MODULE_0__.width, _misc__WEBPACK_IMPORTED_MODULE_0__.height])\n        (root)\n\n    const categories = data.children.map(d => d.name);\n\n    const colors = d3.scaleOrdinal()\n    .domain(categories)\n    .range(d3.schemeRdYlBu[9])\n\n    const mousemove = function(e) {\n        const { __data__: d } = e.target;\n        tooltip.html(`Name: <strong>${d.data.name}</strong><br>\n        Category: ${d.data.category}<br>\n        Value: ${d.data.value}<br>`)\n            .style('left', e.pageX + 20 + 'px')\n            .style('top', e.pageY - 20 + 'px')\n    }\n\n    const legends = svg.append('g')\n        .classed('legends', true)\n        .attr('transform', `translate(${_misc__WEBPACK_IMPORTED_MODULE_0__.margin.left}, ${_misc__WEBPACK_IMPORTED_MODULE_0__.margin.top})`)\n\n    createLegends(legends, categories, colors);\n\n    const groups = map.selectAll('.group')\n        .data(root.children)\n        .enter()\n        .append('g')\n            .classed('group', true)\n        .on('mouseover', _misc__WEBPACK_IMPORTED_MODULE_0__.mouseover)\n        .on('mousemove', mousemove)\n        .on('mouseleave', _misc__WEBPACK_IMPORTED_MODULE_0__.mouseleave)\n\n    const tiles = groups.selectAll('.tile')\n        .data((d) => d.leaves())\n        .enter()\n        .append('rect')\n            .attr('x', (d) => d.x0)\n            .attr('y', (d) => d.y0)\n            .attr('width', (d) => d.x1 - d.x0)\n            .attr('height', (d) => d.y1 - d.y0)\n            .style('stroke', 'white')\n            .style('fill', (d) => colors(d.parent.data.name))\n    \n    groups.selectAll('foreignObject')\n        .data((d) => d.leaves())\n        .enter()\n        .append('foreignObject')\n            .attr('x', (d) => d.x0)\n            .attr('y', (d) => d.y0)\n            .attr('width', (d) => d.x1 - d.x0)\n            .attr('height', (d) => d.y1 - d.y0)\n        .append('xhtml:div')\n            .attr('class', 'label')\n        .html((d) => `${d.data.name}`) \n}\n\n\n//# sourceURL=webpack://charts/./modules/treemap.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"* {\\n    padding: 0;\\n    margin: 0;\\n    box-sizing: border-box;\\n}\\n\\n.chart {\\n    display: flex;\\n    flex-direction: column;\\n    align-items: center;\\n    gap: 1em;\\n    min-height: 100vh;\\n    width: 100vw;\\n    padding: 50px;\\n    font-family: \\\"Helvetica Neue\\\", \\\"Arial\\\", sans-serif;\\n    font-size: 1em;\\n}\\n\\n.header {\\n    display: flex;\\n    flex-direction: column;\\n    align-items: center;\\n    gap: 1em;\\n}\\n\\n#title {\\n    font-size: 2em;\\n    text-align: center;\\n    font-weight: bold;\\n    word-wrap: break-word;\\n}\\n\\n#description {\\n    word-wrap: break-word;\\n    text-align: center;\\n    font-size: 1.2em;\\n    font-weight: 400;\\n}\\n\\n.tooltip {\\n    position: absolute;\\n    visibility: hidden;\\n    z-index: 50;\\n    top: 0;\\n    left: 0;\\n    opacity: 0;\\n    padding: 5px;\\n    background-color: rgba(0, 0, 0, 0.3);\\n    color: white;\\n    backdrop-filter: blur(5px);\\n    font-size: smaller;\\n}\\n\\n.label {\\n    color: #000;\\n    width: 100%;\\n    height: 100%;\\n    font-size: 8px;\\n    padding: 2px;\\n    overflow: hidden;\\n    text-overflow: text-ellipsis;\\n}\\n\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://charts/./src/style.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n\n      content += cssWithMappingToString(item);\n\n      if (needLayer) {\n        content += \"}\";\n      }\n\n      if (item[2]) {\n        content += \"}\";\n      }\n\n      if (item[4]) {\n        content += \"}\";\n      }\n\n      return content;\n    }).join(\"\");\n  }; // import a list of modules into the list\n\n\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\n//# sourceURL=webpack://charts/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://charts/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ \"./node_modules/css-loader/dist/cjs.js!./src/style.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://charts/./src/style.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n\n  return updater;\n}\n\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://charts/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n/* istanbul ignore next  */\n\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n\n    memo[target] = styleTarget;\n  }\n\n  return memo[target];\n}\n/* istanbul ignore next  */\n\n\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n\n  target.appendChild(style);\n}\n\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://charts/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\n\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://charts/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\n\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://charts/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n\n  var needLayer = typeof obj.layer !== \"undefined\";\n\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n\n  css += obj.css;\n\n  if (needLayer) {\n    css += \"}\";\n  }\n\n  if (obj.media) {\n    css += \"}\";\n  }\n\n  if (obj.supports) {\n    css += \"}\";\n  }\n\n  var sourceMap = obj.sourceMap;\n\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  options.styleTagTransform(css, styleElement, options.options);\n}\n\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n\n  styleElement.parentNode.removeChild(styleElement);\n}\n/* istanbul ignore next  */\n\n\nfunction domAPI(options) {\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\n\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://charts/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\n\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://charts/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./src/script.js":
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ \"./src/style.css\");\n/* harmony import */ var _modules_barchart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/barchart */ \"./modules/barchart.js\");\n/* harmony import */ var _modules_heatmap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/heatmap */ \"./modules/heatmap.js\");\n/* harmony import */ var _modules_treemap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../modules/treemap */ \"./modules/treemap.js\");\n/* harmony import */ var _modules_scatterplot__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../modules/scatterplot */ \"./modules/scatterplot.js\");\n/* harmony import */ var _modules_choropleth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../modules/choropleth */ \"./modules/choropleth.js\");\n/* harmony import */ var _modules_misc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../modules/misc */ \"./modules/misc.js\");\n\n\n\n\n\n\n\n\nconst barData = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';\nconst educationData = 'https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json'\nconst countiesData = 'https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json'\nconst heatmapData = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json'\nconst treemapData = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json'\nconst scatterPlotData = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json';\n\n(0,_modules_misc__WEBPACK_IMPORTED_MODULE_6__.setUp)();\n\nPromise\n.all([\n    d3.json(barData), \n    d3.json(scatterPlotData),\n    d3.json(educationData),\n    d3.json(countiesData),\n    d3.json(heatmapData),\n    d3.json(treemapData) \n])\n.then(([{ data }, scatter, education, counties, heatmap, treemap]) => {\n    (0,_modules_barchart__WEBPACK_IMPORTED_MODULE_1__.drawBarChart)(data);/* \n    drawScatterPlot(scatter);\n    drawChoropleth(education, counties);\n    drawHeatMap(heatmap);\n    drawTreeMap(treemap); */\n})\n\n//# sourceURL=webpack://charts/./src/script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/script.js");
/******/ 	
/******/ })()
;
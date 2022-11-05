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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"BarChart\": () => (/* binding */ BarChart)\n/* harmony export */ });\n/* harmony import */ var _misc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./misc */ \"./modules/misc.js\");\n\n\nconst BarChart = (svg, { data }) => {\n    data.forEach(item => {\n        const date = new Date(item[0]);\n        const year = date.getFullYear();\n        const quarter = Math.floor((date.getMonth() + 3) / 3) / 4;\n        item[0] = year + quarter;\n    })\n\n    const xScale = d3.scaleLinear()\n    .domain([d3.min(data, (d) => Number.parseFloat(d[0])), \n    d3.max(data, (d) => Number.parseFloat(d[0]))])\n    .range([50, _misc__WEBPACK_IMPORTED_MODULE_0__.width])\n\n    const yScale = d3.scaleLinear()\n    .domain([0, d3.max(data, (d) => Number.parseFloat(d[1]))])\n    .range([_misc__WEBPACK_IMPORTED_MODULE_0__.height, 0])\n    .nice()\n\n    const move = (e) => {\n        const { __data__: d } = e.target;\n        (0,_misc__WEBPACK_IMPORTED_MODULE_0__.mousemove)(e, `${Math.floor(d[0])} Q${(d[0] - Math.floor(d[0])) * 4 + 1} <br> \n        $${d[1]} B`)\n    }\n\n    svg.selectAll('rect')\n    .data(data)\n    .enter()\n    .append('rect')\n        .attr('class', 'bar')\n        .attr('x', (d) => xScale(Number.parseFloat(d[0])))\n        .attr('y', (d) => yScale(Number.parseFloat(d[1])))\n        .attr('height', (d) => _misc__WEBPACK_IMPORTED_MODULE_0__.height - yScale(Number.parseFloat(d[1])))\n        .attr('fill', 'orange')\n    .on('mouseover', _misc__WEBPACK_IMPORTED_MODULE_0__.mouseover)\n    .on('mousemove', move)\n    .on('mouseleave', _misc__WEBPACK_IMPORTED_MODULE_0__.mouseleave)\n    .transition()\n        .delay((d, i) => i * 5)\n        .ease(d3.easeLinear)\n        .attr('width', 2.7)\n\n    svg.append('g')\n        .attr('id', 'x-axis')\n        .attr('transform', `translate(0, ${_misc__WEBPACK_IMPORTED_MODULE_0__.height})`)\n        .call(d3.axisBottom(xScale).ticks(null, 'd'))\n\n    svg.append('g')\n        .attr('id', 'y-axis')\n        .attr('transform', 'translate(50, 0)')\n        .call(d3.axisLeft(yScale))\n    \n    svg.append(\"text\")\n        .attr(\"transform\", \"rotate(-90)\")\n        .attr(\"y\", 60)\n        .attr(\"x\", -500/2)\n        .attr(\"dy\", \"1em\")\n        .style(\"text-anchor\", \"middle\")\n        .text(\"Gross Domestic Product\"); \n}\n\n\n\n//# sourceURL=webpack://charts/./modules/barchart.js?");

/***/ }),

/***/ "./modules/choropleth.js":
/*!*******************************!*\
  !*** ./modules/choropleth.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Choropleth\": () => (/* binding */ Choropleth)\n/* harmony export */ });\n/* harmony import */ var _misc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./misc */ \"./modules/misc.js\");\n\n\nconst Choropleth = (svg, education, usTopoJson) => {\n    const countiesGeoJson = topojson.feature(usTopoJson, \n        usTopoJson.objects.counties)\n\n    const counties = countiesGeoJson.features.sort((a, b) => \n        a.id < b.id ? -1 : (a.id === b.id ? 0: 1));\n\n    const path = d3.geoPath();\n\n    const colorsScale = d3.scaleLinear()\n    .domain(d3.extent(education, (e) => e.bachelorsOrHigher))\n    .range(['white', 'indigo'])\n\n    const move = (e) => {\n        const { attributes } = e.target;\n        const educationInfo = education[Number.parseInt(attributes[3].value)];\n        (0,_misc__WEBPACK_IMPORTED_MODULE_0__.mousemove)(e, `${educationInfo.area_name}, ${educationInfo.state}:\n        ${educationInfo.bachelorsOrHigher}%`);\n    }\n    \n    const map = svg.append('g')\n        .attr('id', 'counties')\n        .attr('transform', 'translate(0, 150)')\n        .selectAll('path')\n        .data(counties)\n        .enter()\n        .append('path')\n            .classed('county', true)\n            .attr('data-fips', (d) => d.id)\n            .attr('data-education', (d, i) => education[i].bachelorsOrHigher)\n            .attr('index', (d, i) => i)\n            .style('stroke', 'white')\n            .style('stroke-dasharray', '1,1')\n            .style('stroke-width', 0.5)     \n        .on('mouseover', _misc__WEBPACK_IMPORTED_MODULE_0__.mouseover)\n        .on('mousemove', move)\n        .on('mouseleave', _misc__WEBPACK_IMPORTED_MODULE_0__.mouseleave)\n    \n    const mapPromise = map.transition()\n        .delay((d, i) => i * 2)\n        .ease(d3.easePolyIn)\n        .attr('d', path)\n        .style('fill', (d, i) => colorsScale(education[i].bachelorsOrHigher))   \n        .end()    \n\n    //add borders\n    const borderPromise = svg.append('g')\n            .attr('id', 'borders')\n            .attr('transform', 'translate(0, 150)')\n        .append('path')\n        .style('fill', 'none')\n        .style('stroke', 'white')\n        .style('stroke-width', 1.5)\n        .transition()\n            .delay((d, i) => i * 2)\n            .ease(d3.easePolyIn)\n            .attr('d', path(topojson.mesh(usTopoJson, \n            usTopoJson.objects.states, \n            function(a, b) { return a !== b; })))  \n        .end()\n\n    \n    const legendTicks = d3.scaleLinear()\n        .domain(d3.extent(education, (e) => e.bachelorsOrHigher))\n        .range([0, 200])\n        .nice()\n    \n    ;(0,_misc__WEBPACK_IMPORTED_MODULE_0__.createGradientLegends)(svg, legendTicks, colorsScale, [mapPromise, borderPromise]);\n}\n\n\n//# sourceURL=webpack://charts/./modules/choropleth.js?");

/***/ }),

/***/ "./modules/heatmap.js":
/*!****************************!*\
  !*** ./modules/heatmap.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"HeatMap\": () => (/* binding */ HeatMap)\n/* harmony export */ });\n/* harmony import */ var _misc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./misc */ \"./modules/misc.js\");\n\n\nconst MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', \n'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']\n\nconst createMatrix = (data) => {\n    const matrix = [];\n    const rows = Math.floor(data.length / 12);\n    for (let i = 0; i < rows; i++) {\n        matrix.push(data.splice(0, 12))\n    }\n    matrix.push(data)\n    return matrix;\n}\n\nconst HeatMap = (svg, { baseTemperature: base, \n    monthlyVariance: variances }) => {\n\n    const matrix = createMatrix(variances.slice(0))\n    const variancesExtent = d3.extent(variances, (v) => base + v.variance)\n    const years = Array.from(new Set(variances.map(v => v.year)))\n    const yearsExtent = d3.extent(years)\n\n    ;(0,_misc__WEBPACK_IMPORTED_MODULE_0__.addDescription)(svg, `${yearsExtent[0]} - \n    ${yearsExtent[1]}<br>(base temperature of ${base}°C)`);\n    \n    const monthsScale = d3.scaleBand()\n    .domain(MONTHS)\n    .range([100, _misc__WEBPACK_IMPORTED_MODULE_0__.height])\n\n    const yearsScale = d3.scaleLinear()\n    .domain(yearsExtent)\n    .range([40, _misc__WEBPACK_IMPORTED_MODULE_0__.width])\n\n    const colorsScale = d3.scaleSequential()\n    .domain(variancesExtent)\n    .interpolator(d3.interpolateRainbow)\n    \n    const move = (e) => {\n        const { __data__: d } = e.target;\n        const cell = d3.select(undefined);\n        (0,_misc__WEBPACK_IMPORTED_MODULE_0__.mousemove)(e, `${d.year} - ${MONTHS[d.month - 1]}<br>\n        ${(Number.parseFloat(d.variance) + base).toFixed(2)}°C<br>\n        ${(Number.parseFloat(d.variance)).toFixed(2)}°C<br>`)\n    }\n\n    const columns  = svg.selectAll('.column') \n        .data(matrix)\n        .enter()\n        .append('g')\n            .classed('column', true)\n            .attr('transform', (d, i) => `translate(${yearsScale(i + 1753)}, 0)`)\n    \n    const cells = columns.selectAll(\".cell\")\n        .data((d) => d)\n        .enter()\n        .append(\"g\")\n            .attr(\"class\", \"cell\")\n            .attr(\"transform\", (d) => \n            `translate(0, ${monthsScale(MONTHS[d.month - 1])})`)\n            .style('stroke', 'none')\n        .on('mouseover', _misc__WEBPACK_IMPORTED_MODULE_0__.mouseover)\n        .on('mousemove', move)\n        .on('mouseleave', _misc__WEBPACK_IMPORTED_MODULE_0__.mouseleave)\n\n    const mapPromise = cells.append('rect')\n        .style('fill', ({ variance }) => colorsScale(variance + base))\n        .attr('width', 5)\n        .transition()\n            .delay(1000)\n            .duration(500)\n            .ease(d3.easeQuadIn)\n            .attr('height', monthsScale.bandwidth())\n        .end()\n            \n    svg.append('g')\n        .attr('id', 'xAxis')\n        .attr('transform',  `translate(0, ${_misc__WEBPACK_IMPORTED_MODULE_0__.height})`)\n        .call(d3.axisBottom(yearsScale)\n                .ticks(null, 'd'))\n\n    svg.append('g')\n        .attr('id', 'yAxis')\n        .attr('transform', 'translate(40, 0)')\n        .call(d3.axisLeft(monthsScale))\n\n    const legendTicks = d3.scaleLinear()\n    .domain(variancesExtent)\n    .range([0, 200])\n    .nice()\n\n    ;(0,_misc__WEBPACK_IMPORTED_MODULE_0__.createGradientLegends)(svg, legendTicks, colorsScale, [mapPromise], `translate(${_misc__WEBPACK_IMPORTED_MODULE_0__.width - 200}, 50)`)\n}\n\n\n//# sourceURL=webpack://charts/./modules/heatmap.js?");

/***/ }),

/***/ "./modules/misc.js":
/*!*************************!*\
  !*** ./modules/misc.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addDescription\": () => (/* binding */ addDescription),\n/* harmony export */   \"addTitle\": () => (/* binding */ addTitle),\n/* harmony export */   \"createGradientLegends\": () => (/* binding */ createGradientLegends),\n/* harmony export */   \"height\": () => (/* binding */ height),\n/* harmony export */   \"margin\": () => (/* binding */ margin),\n/* harmony export */   \"mouseleave\": () => (/* binding */ mouseleave),\n/* harmony export */   \"mousemove\": () => (/* binding */ mousemove),\n/* harmony export */   \"mouseover\": () => (/* binding */ mouseover),\n/* harmony export */   \"tooltip\": () => (/* binding */ tooltip),\n/* harmony export */   \"width\": () => (/* binding */ width)\n/* harmony export */ });\nconst margin = { top: 10, left: 10 }\n\nconst width = 1000 - margin.left * 2;\n\nconst height = 850 - margin.top * 2;\n\nconst tooltip = d3.select('.chart')\n    .append('div')\n        .attr('class', 'tooltip')\n\n\nconst mousemove = (e, html) => {\n    tooltip.html(html)\n        .style('left', e.pageX + 20 + 'px')\n        .style('top', e.pageY - 5 + 'px')\n}\n\nconst mouseover = function(e) {\n    tooltip.style('opacity', 1)\n        .style('visibility', 'visible')\n    d3.select(this)\n        .style('stroke', 'black')\n        .style('stroke-width', 1)\n}\n\nconst mouseleave = function(e) {\n    tooltip.style('opacity', 0)\n        .style('visibility', 'hidden')\n    d3.select(this)\n        .style('stroke', 'none')\n}\n\nconst addTitle = (svg, title) => {\n    svg.append('foreignObject')\n            .attr('x', (d) => 0)\n            .attr('y', (d) => 0)\n            .attr('width', (d) => 1000)\n            .attr('height', (d) => 50)\n        .append('xhtml:h1')\n            .attr('class', 'title')\n            .text(title)\n}\n\nconst addDescription = (svg, description) => {\n    svg.append('foreignObject')\n            .attr('x', (d) => 0)\n            .attr('y', (d) => 50)\n            .attr('width', (d) => 1000)\n            .attr('height', (d) => 50)\n        .append('xhtml:p')\n            .attr('class', 'description')\n            .html(description)\n}\n\nconst createGradientLegends = (svg, legendTicks, colorsScale, promises,\n    coordinates='translate(700, 100)') => {\n    const legends = svg.append('g')\n        .attr('id', 'legends')\n        .attr('transform', coordinates)\n    \n    Promise.all(promises)\n    .then(() => {\n        legends.selectAll('rect')\n            .data(d3.range(...legendTicks.range()))\n            .enter()\n            .append('rect')\n                .attr('width', 1)\n                .attr('height', 10)\n                .attr('fill', (d) => colorsScale(legendTicks.invert(d)))\n                .transition()\n                    .duration(1000)\n                    .ease(d3.easeQuadIn)\n                    .attr('x', (d, i) => i)\n                    .attr('y', 0)\n\n        legends.call(d3.axisBottom(legendTicks)\n            .ticks(5)\n            .tickSize(15)\n            .tickFormat((d) => `${d}%`));\n            \n        legends.select('path')\n            .style('stroke', 'none')\n\n        legends.selectAll('line')\n            .style('stroke', 'black')\n    })\n}\n\n//# sourceURL=webpack://charts/./modules/misc.js?");

/***/ }),

/***/ "./modules/scatterplot.js":
/*!********************************!*\
  !*** ./modules/scatterplot.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ScatterPlot\": () => (/* binding */ ScatterPlot)\n/* harmony export */ });\n/* harmony import */ var _misc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./misc */ \"./modules/misc.js\");\n\n\nconst toDateUTC = (seconds) => new Date(Date.UTC(0, 0, 0, 0, 0, seconds));\n\nconst embellishChart = (svg, xScale, yScale, colors, dopingStatus) => {\n    svg.append('g')\n        .attr('id', 'x-axis')\n        .attr('transform', `translate(0, ${_misc__WEBPACK_IMPORTED_MODULE_0__.height})`)\n        .call(d3.axisBottom(xScale)\n            .ticks(d3.timeYear.every(2)))\n\n    svg.append('g')\n        .attr('id', 'y-axis')\n        .call(d3.axisLeft(yScale)\n            .tickFormat(d3.timeFormat('%M:%S')))\n        .transition()\n            .duration(500)\n            .ease(d3.easeLinear)\n            .attr('transform', 'translate(70, 0)')\n\n    svg.append(\"text\")\n        .attr(\"transform\", \"rotate(-90)\")\n        .attr(\"dy\", \"1em\")\n        .style(\"text-anchor\", \"middle\")\n        .text(\"Time\")\n        .transition()\n            .duration(500)\n            .ease(d3.easeLinear)\n            .attr(\"y\", 10)\n            .attr(\"x\", -500 / 2)\n\n    //add legends\n    svg.selectAll('text#legend-heading')\n        .data(['Doping Allegations'])\n        .enter()\n        .append('text')\n        .attr('x', _misc__WEBPACK_IMPORTED_MODULE_0__.width - 200)\n        .text((d) => d)\n        .transition()\n            .duration(500)\n            .ease(d3.easeLinear)\n            .attr('y', (d, i) => _misc__WEBPACK_IMPORTED_MODULE_0__.height / 2 - 10 + i * 20)\n\n    svg.selectAll('rect')\n        .data(dopingStatus)\n        .enter()\n        .append('rect')\n        .attr('x', _misc__WEBPACK_IMPORTED_MODULE_0__.width - 200)\n        .attr('y', (d, i) => _misc__WEBPACK_IMPORTED_MODULE_0__.height / 2 + i * 20)\n        .attr('width', 20)\n        .attr('height', 20)\n        .style('fill-opacity', 0.6)\n        .transition()\n            .duration(500)\n            .ease(d3.easeLinear)\n            .style('fill', (d) => colors(d))\n\n\n    svg.selectAll('text#legend-text')\n        .data(dopingStatus)\n        .enter()\n        .append('text')\n        .attr('y', (d, i) => _misc__WEBPACK_IMPORTED_MODULE_0__.height / 2 + 15 + i * 20)\n        .text((d) => d)\n        .transition()\n            .duration(500)\n            .ease(d3.easeLinear)\n            .attr('x', _misc__WEBPACK_IMPORTED_MODULE_0__.width - 170)\n}\n\nconst ScatterPlot = (svg, data) => {\n    const dopingStatus = ['without', 'with']\n\n    const extent = d3.extent(data, ({ Year }) => new Date(Year, 0, 1));\n    const xScale = d3.scaleTime()\n        .domain([new Date(extent[0].getFullYear() - 1, 0, 1), \n        new Date(extent[1].getFullYear() + 1, 0, 1)])\n        .range([70, _misc__WEBPACK_IMPORTED_MODULE_0__.width])\n        .nice()\n\n    const yScale = d3.scaleTime()\n        .domain(d3.extent(data, ({\n            Seconds\n        }) => toDateUTC(Seconds)))\n        .range([_misc__WEBPACK_IMPORTED_MODULE_0__.height, 100])\n        .nice()\n\n    const colors = d3.scaleOrdinal()\n        .domain(dopingStatus)\n        .range(d3.schemeSet1)\n\n    const move = (e) => {\n        const { __data__: d } = e.target;\n        (0,_misc__WEBPACK_IMPORTED_MODULE_0__.mousemove)(e, `${d.Name} ( ${d.Nationality} )<br>\n            Year: ${d.Year}, Time: ${d.Time}${d.Doping && `<br><br>${d.Doping}`}`)\n    }\n\n    svg.selectAll('circle')\n        .data(data)\n        .enter()\n        .append('circle')\n        .attr('class', 'dot')\n        .attr('cx', ({\n            Year\n        }) => xScale(new Date(Year, 0, 1)))\n        .attr('cy', ({\n            Seconds\n        }) => yScale(toDateUTC(Seconds)))\n        .style('fill', ({\n            Doping\n        }) =>\n            Doping ? colors('with') :\n                colors('without'))\n        .style('fill-opacity', 0.6)\n        .on('mouseover', _misc__WEBPACK_IMPORTED_MODULE_0__.mouseover)\n        .on('mousemove', move)\n        .on('mouseleave', _misc__WEBPACK_IMPORTED_MODULE_0__.mouseleave)\n        .transition()\n            .delay((d, i) => i * 50)\n            .duration(300)\n            .ease(d3.easeBounce)\n            .attr('r', 8)\n        .end()\n    .then(() => embellishChart(svg, xScale, yScale, colors, dopingStatus))\n    \n}\n\n\n//# sourceURL=webpack://charts/./modules/scatterplot.js?");

/***/ }),

/***/ "./modules/treemap.js":
/*!****************************!*\
  !*** ./modules/treemap.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"TreeMap\": () => (/* binding */ TreeMap)\n/* harmony export */ });\n/* harmony import */ var _misc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./misc */ \"./modules/misc.js\");\n\n\nconst createLegends = (svg, names, colorsScale) => {\n    svg.selectAll('rect')\n        .data(names)\n        .enter()\n        .append('rect')\n            .attr('width', 50)\n            .attr('height', 10)\n            .attr('fill', (d) => colorsScale(d))\n            .style('fill-opacity', 0.6)\n        .transition()\n            .duration(500)\n            .ease(d3.easeQuadIn)\n            .attr('x', (d, i) => i * 45 + 80)\n            .attr('y', 0)\n\n    svg.selectAll('text')\n        .data(names)\n        .enter()\n        .append('text')\n            .attr('x', (d, i) => i * 45 + 90)\n            .attr('y', 20)\n            .text((d) => d) \n                .style('font-size', '10px')     \n}\n\nconst TreeMap = (svg, data, title, description) => {\n    const map = svg.append('g')\n        .classed('map', true)\n        .attr('transform', `translate(${_misc__WEBPACK_IMPORTED_MODULE_0__.margin.left}, 140)`)\n    \n    const root = d3.hierarchy(data).sum((d) => d.value);\n    \n    d3.treemap()\n        .size([_misc__WEBPACK_IMPORTED_MODULE_0__.width, _misc__WEBPACK_IMPORTED_MODULE_0__.height - 140])\n        .paddingInner(2)\n        (root)\n\n    const categories = data.children.map(d => d.name);\n\n    const colors = d3.scaleOrdinal()\n    .domain(categories)\n    .range(d3.schemeRdYlBu[9])\n\n    const move = function(e) {\n        const { __data__: d } = e.target;\n        (0,_misc__WEBPACK_IMPORTED_MODULE_0__.mousemove)(e, `Name: <strong>${d.data.name}</strong><br>\n        Category: ${d.data.category}<br>\n        Value: ${d.data.value}<br>`)\n    }\n\n    const legends = svg.append('g')\n        .classed('legends', true)\n        .attr('transform', `translate(${_misc__WEBPACK_IMPORTED_MODULE_0__.margin.left}, 100)`)\n\n    const groups = map.selectAll('.group')\n        .data(root.children)\n        .enter()\n        .append('g')\n            .classed('group', true)\n\n    groups.selectAll('foreignObject')\n        .data((d) => d.leaves())\n        .enter()\n        .append('foreignObject')\n            .attr('x', (d) => d.x0)\n            .attr('y', (d) => d.y0)\n            .attr('width', (d) => d.x1 - d.x0)\n            .attr('height', (d) => (d.y1 - d.y0))\n        .append('xhtml:div')\n            .attr('class', 'treemap-label')\n        .html((d) => `${d.data.name}`)\n\n    const tiles = groups.selectAll('.tile')\n        .data((d) => d.leaves())\n        .enter()\n        .append('rect')\n            .attr('x', (d) => d.x0)\n            .attr('y', (d) => d.y0)\n            .style('fill', (d) => colors(d.parent.data.name))\n            .style('fill-opacity', 0.6)\n        .on('mouseover', _misc__WEBPACK_IMPORTED_MODULE_0__.mouseover)\n        .on('mousemove', move)\n        .on('mouseleave', _misc__WEBPACK_IMPORTED_MODULE_0__.mouseleave)\n        .transition()\n            .delay((d, i) => i * 100)\n            .duration(500)\n            .ease(d3.easeQuadIn)\n            .attr('width', (d) => d.x1 - d.x0)\n            .attr('height', (d) => d.y1 - d.y0)\n            .end()\n    .then(() => createLegends(legends, categories, colors))\n}\n\n\n//# sourceURL=webpack://charts/./modules/treemap.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"* {\\n    padding: 0;\\n    margin: 0;\\n    box-sizing: border-box;\\n}\\n\\nbody { \\n    width: 100vw;\\n    font-family: \\\"Helvetica Neue\\\", \\\"Arial\\\", sans-serif;\\n    font-size: 1em;\\n    min-height: 100vh;\\n    background: linear-gradient(lavender, #ebf8e1, pink);\\n}\\n\\n.chart {\\n    display: flex;\\n    flex-direction: column;\\n    align-items: center;\\n    gap: 1em;\\n    padding: 50px;\\n    counter-reset: chart;\\n}\\n\\n.header {\\n    display: flex;\\n    flex-direction: column;\\n    align-items: center;\\n    gap: 1em;\\n    margin-bottom: 10px;\\n}\\n\\n.title {\\n    text-align: center;\\n    padding-top: 0.5em;\\n    font-size: 1.2em;\\n    font-weight: 500;\\n    word-wrap: break-word;\\n}\\n\\n.header > .title {\\n    font-size: 2em;\\n    font-weight: 700;\\n}\\n\\n.description {\\n    word-wrap: break-word;\\n    font-size: 1em;\\n    text-align: center;\\n    font-weight: 400;\\n}\\n\\n.tooltip {\\n    position: absolute;\\n    visibility: hidden;\\n    z-index: 50;\\n    top: 0;\\n    left: 0;\\n    opacity: 0;\\n    padding: 5px;\\n    background-color: rgba(0, 0, 0, 0.3);\\n    color: white;\\n    backdrop-filter: blur(5px);\\n    font-size: smaller;\\n}\\n\\n.treemap-label {\\n    color: #000;\\n    width: 100%;\\n    height: 100%;\\n    font-size: 8px;\\n    padding: 2px;\\n    overflow: hidden;\\n    text-overflow: text-ellipsis;\\n}\\n\\n.chart-type {\\n    font-size: 1.5em;\\n    text-transform: capitalize;\\n    vertical-align: middle;\\n    margin-top: 1em;\\n}\\n\\n.chart-type::before {\\n    counter-increment: chart;\\n    content: counter(chart) \\\".\\\";\\n    margin-right: 0.2em;\\n}\\n\\n.target {\\n    inline-size: 10px;\\n    block-size: 10px;\\n}\\n\\n.footer {\\n    display: flex;\\n    justify-content: center;\\n    gap: 1em;\\n}\\n\\n.footer a {\\n    color: inherit;\\n    text-decoration: none;\\n    transition: all 0.2s ease-in-out;\\n}\\n\\n.footer a:hover {\\n    font-weight: bold;\\n}\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://charts/./src/style.css?./node_modules/css-loader/dist/cjs.js");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ \"./src/style.css\");\n/* harmony import */ var _modules_barchart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/barchart */ \"./modules/barchart.js\");\n/* harmony import */ var _modules_heatmap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/heatmap */ \"./modules/heatmap.js\");\n/* harmony import */ var _modules_treemap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../modules/treemap */ \"./modules/treemap.js\");\n/* harmony import */ var _modules_scatterplot__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../modules/scatterplot */ \"./modules/scatterplot.js\");\n/* harmony import */ var _modules_choropleth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../modules/choropleth */ \"./modules/choropleth.js\");\n/* harmony import */ var _modules_misc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../modules/misc */ \"./modules/misc.js\");\n\n\n\n\n\n\n\n\nconst data = [\n    {   type: 'barchart',\n        url: ['https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'],\n        title: 'United States GDP', \n    },\n    {   \n        type: 'scatterplot', \n        url: ['https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json'],\n        title: 'Doping in Professional Bicycle Racing',\n        description: \"35 Fastest Times Up Alpe d'Huez\"\n    },\n    {\n        type: 'choropleth',\n        url: [\n            'https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json',\n            'https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json'\n        ],\n        title: 'United States Educational Attainment',\n        description: `Percentage of adults age 25 and older with\n        a bachelor's degree or higher (2010 - 2014)`,\n    },\n    {   \n        type: 'heatmap', \n        url: ['https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json'],\n        title: 'Monthly Global Land-Surface Temperature',\n    },\n    {   \n        type: 'treemap', \n        url: ['https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json'],\n        title: 'Video Games Sales',\n        description: 'Top 100 Most Sold Video Games Grouped by Platform',\n    },\n]\n\nconst components = [\n    _modules_barchart__WEBPACK_IMPORTED_MODULE_1__.BarChart,\n    _modules_scatterplot__WEBPACK_IMPORTED_MODULE_4__.ScatterPlot,\n    _modules_choropleth__WEBPACK_IMPORTED_MODULE_5__.Choropleth,\n    _modules_heatmap__WEBPACK_IMPORTED_MODULE_2__.HeatMap,\n    _modules_treemap__WEBPACK_IMPORTED_MODULE_3__.TreeMap,\n]\n\nconst options = {\n    root: null,\n    rootMargin: '0px',\n    threshold: 1.0,\n}\n  \nconst handleIntersect = (entries, observer) => {\n    if (entries[0].isIntersecting) {\n        drawChart(data[0]);\n    }\n}\n\nconst  observer = new IntersectionObserver(handleIntersect, options);\n\nconst drawChart = (chart) => {\n    if (data.length === 0) return;\n    d3.select('.chart')\n        .append('h1')\n        .attr('class', 'chart-type')\n        .text(`${data[0].type}`)\n\n    const promise = Promise.all(chart.url.map(u => d3.json(u)));\n        \n    promise.then(response => {\n        const svg = d3.select('.chart')\n            .append('svg')\n            .attr('viewBox', `0 0 ${_modules_misc__WEBPACK_IMPORTED_MODULE_6__.width + 50} ${_modules_misc__WEBPACK_IMPORTED_MODULE_6__.height + 50}`)\n\n        if (data[0].hasOwnProperty('title')) \n            (0,_modules_misc__WEBPACK_IMPORTED_MODULE_6__.addTitle)(svg, data[0].title)   \n        if (data[0].hasOwnProperty('description')) \n            (0,_modules_misc__WEBPACK_IMPORTED_MODULE_6__.addDescription)(svg, data[0].description)\n\n        components[0](svg, ...response);\n\n        const target = document.getElementsByClassName('target')[0];\n\n        if (target) {\n            document.getElementsByClassName('chart')[0].removeChild(target);\n            document.getElementsByClassName('chart')[0].appendChild(target);\n        } else {\n            const div = document.createElement('div');\n            div.classList.add('target');\n            document.getElementsByClassName('chart')[0].appendChild(div);\n            observer.observe(div);\n        }\n\n        data.shift();\n        components.shift();\n\n        if (data.length === 0) {\n            observer.disconnect();\n        }\n    })\n}\n\ndocument.addEventListener('DOMContentLoaded', () => drawChart(data[0]));\n\n//# sourceURL=webpack://charts/./src/script.js?");

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
// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;
var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "age"

// Retrieve data from the CSV file and execute everything below
d3.csv("assets/data/data.csv", function(stateHealth){
    console.log(stateHealth);

    // parse through data
    stateHealth.forEach(function(data){
        data.smokes = +data.smokes;
        data.age = +data.age;
    })

    //xLinearScale
    var xLinearScale = xScale(stateHealth, chosenXAxis);

    // y scale function
    var yLinearScale = d3.scaleLinear()
        .domain([0,d3.max(stateHealth, d => d.smokes)])
        .range([height, 0]);

    // Initial axis funcs
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.leftAxis(yLinearScale);

    // append x axis
    
})
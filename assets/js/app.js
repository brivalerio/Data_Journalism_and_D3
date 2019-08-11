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
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "age"
var chosenYAxis = "smokes"

// Retrieve data from the CSV file and execute everything below
d3.csv("assets/data/data.csv")
    .then(function(stateHealth){

    // parse through data
    stateHealth.forEach(function(data){
        data.age = +data.age;
        data.smokes = +data.smokes;
   
    });

    //xLinearScale
    var xLinearScale = d3.scaleLinear()
        .domain([d3.max(stateHealth, d => d.age)])
        .range([0, width]);
    // var xLinearScale = xScale(stateHealth, chosenXAxis);

    // y scale function
    var yLinearScale = d3.scaleLinear()
        .domain([0,d3.max(stateHealth, d => d.smokes)])
        .range([height, 0]);
    // var yLinearScale = yScale(stateHealth, chosenYAxis);

    // Initial axis
    var bottomAxis = d3.axisBottom(xLinearScale).ticks(7);
    var leftAxis = d3.axisLeft(yLinearScale);

    // append x axis
    var xAxis = chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    // append y axis
    var yAxis = chartGroup.append("g")
        .classed("y-axis", true)
        .call(leftAxis);

  // append initial circles
    var circlesGroup = chartGroup.selectAll("circle")
        .data(stateHealth)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d[chosenXAxis]))
        .attr("cy", d => yLinearScale(d.smokes))
        .attr("r", 20)
        .attr("fill", "pink")
        .attr("opacity", ".5");

    // x label
    var aLabel = xlabelsGroup.append("text")
        .attr("x",0)
        .attr("y",40)
        .attr("value", "age")
        // .classed("active", true)
        .text("Age (Median)");

    // y label
    var sLabel = ylabelsGroup.append("text")
        .attr("x",0)
        .attr("y",-10)
        .attr("value", "smokes")
        // .classed("active", true)
        .text("Smokes (%)");    



})

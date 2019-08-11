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
        .domain([28,d3.max(stateHealth, d => d.age)+1])
        .range([0, width]);

    // yLinearScale
    var yLinearScale = d3.scaleLinear()
        .domain([8,d3.max(stateHealth, d => d.smokes)+1])
        .range([height, 0]);

    // Initial axis
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // append x axis
    chartGroup.append("g")
        
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    // append y axis
    chartGroup.append("g")
        .call(leftAxis);

    // append circles
    var circlesGroup = chartGroup.selectAll("circle")
        .data(stateHealth)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.age))
        .attr("cy", d => yLinearScale(d.smokes))
        .attr("r", 20)
        .attr("fill", "pink")
        .attr("opacity", ".5");

    // initialize tool tip





})

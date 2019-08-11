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
        .domain([29.5,d3.max(stateHealth, d => d.age)+1])
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
        .attr("r", 15)
        .attr("fill", "lightsteelblue")
        .attr("opacity", ".5");

    // append text to circles
    var circlesGroup = chartGroup.selectAll()
        .data(stateHealth)
        .enter()
        .append("text")
        .attr("x", d => xLinearScale(d.age))
        .attr("y", d => yLinearScale(d.smokes)+6)
        .style("font-size", "17px")
        .style("text-anchor", "middle")
        .style('fill', "black")
        .text(d => (d.abbr));

    // initialize tool tip
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([0, 10])
      .style("border", "solid")
      .style("border-color", "lightsteelblue")
      .style("background-color", "lightsteelblue")
      .style("border-radius", "8px")
    // .direction('n')
      .html(function(d) {
        return (`${d.state}<br>Age: ${d.age}<br>Smokes (%): ${d.smokes}`);
      });

    // display/hide tooltip on mouseover/mouseout
    circlesGroup.call(toolTip)
      .on("mouseover", toolTip.show)
      .on("mouseout", toolTip.hide);

    // event listeners to display/hide tooltip
    // mouseover event
    // circlesGroup.on("mouseover", function(data) {
    //     toolTip.show(data, this);
    //   })
    //     // mouseout event
    //     .on("mouseout", function(data, index) {
    //       toolTip.hide(data);
    //     });
  
    // axes labels
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Smokes (%)");

    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .text("Age (Median)");

});

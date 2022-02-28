/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your bar charts in this file 


// Set dimensions and margins for plots 
const width = 900; 
const height = 450; 
const margin = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffset = 15; 


// TODO: What does this code do? 
const svg1 = d3
  .select("#hard-coded-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// Hardcoded barchart data
const data1 = [
  {name: 'A', score: 92},
  {name: 'B', score: 15},
  {name: 'C', score: 67},
  {name: 'D', score: 89},
  {name: 'E', score: 53},
  {name: 'F', score: 91},
  {name: 'G', score: 18}
];

/*

  Axes

*/ 

// TODO: What does this code do? - Find max y value to plot 
let maxY1 = d3.max(data1, function(d) { return d.score; });

// TODO: What does each line of this code do? - Create y scale 
let yScale1 = d3.scaleLinear()
            .domain([0,maxY1])
            .range([height-margin.bottom,margin.top]); 

// TODO: What does each line of this code do?  - Create x scale
let xScale1 = d3.scaleBand()
            .domain(d3.range(data1.length))
            .range([margin.left, width - margin.right])
            .padding(0.1); 

// TODO: What does each line of this code do?  - Add y axis to webpage  
svg1.append("g")
   .attr("transform", `translate(${margin.left}, 0)`) 
   .call(d3.axisLeft(yScale1)) 
   .attr("font-size", '20px'); 

// TODO: What does each line of this code do? - Add x axis to webpage 
svg1.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    .call(d3.axisBottom(xScale1) 
            .tickFormat(i => data1[i].name))  
    .attr("font-size", '20px'); 

/* 

  Tooltip Set-up  

*/

// TODO: What does each line of this code do? - Add div for tooltip to webpage
const tooltip1 = d3.select("#hard-coded-bar") 
                .append("div") 
                .attr('id', "tooltip1") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 

// TODO: What does each line of this code do? - Add values to tooltip on mouseover, make tooltip div opaque   
const mouseover1 = function(event, d) {
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
          .style("opacity", 1);  
}

// TODO: What does each line of this code do? - Position tooltip to follow mouse 
const mousemove1 = function(event, d) {
  tooltip1.style("left", (event.x)+"px") 
          .style("top", (event.y + yTooltipOffset) +"px"); 
}

// TODO: What does this code do? - Return tooltip to transparant when mouse leaves
const mouseleave1 = function(event, d) { 
  tooltip1.style("opacity", 0); 
}

/* 

  Bars 

*/

// TODO: What does each line of this code do? - Add bars to the webpage, bind events needed for tooltips 
svg1.selectAll(".bar") 
   .data(data1) 
   .enter()  
   .append("rect") 
     .attr("class", "bar") 
     .attr("x", (d,i) => xScale1(i)) 
     .attr("y", (d) => yScale1(d.score)) 
     .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) 
     .attr("width", xScale1.bandwidth()) 
     .on("mouseover", mouseover1) 
     .on("mousemove", mousemove1)
     .on("mouseleave", mouseleave1);


/*******************
 
  Bar chart 2
 
 *******************/ 

 // Add div for tooltip to webpage
 const tooltip2 = d3.select("body") 
 .append("div") 
 .attr('id', "tooltip2") 
 .style("opacity", 0) 
 .attr("class", "tooltip"); 

// Add values to tooltip on mouseover, make tooltip div opaque  
const mouseover2 = function(event, d) {
tooltip2.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
.style("opacity", 1);  
}

// Position tooltip to follow mouse 
const mousemove2 = function(event, d) {
tooltip2.style("left", (event.pageX)+"px") 
.style("top", (event.pageY + yTooltipOffset)+"px"); 
}

// Return tooltip to transparant when mouse leaves
const mouseleave2 = function(event, d) { 
tooltip2.style("opacity", 0); 
}

d3.csv("data/barchart.csv").then(function(data) {

// Add an svg to csv-bar div  
let svg2 = d3
.select("#csv-bar")
.append("svg")
.attr("width", width-margin.left-margin.right)
.attr("height", height - margin.top - margin.bottom)
.attr("viewBox", [0, 0, width, height]);

//Axes 

// Find max y value to plot  
let maxY2 = d3.max(data, function(d) { return d.score; });

// Create y scale   
let yScale2 = d3.scaleLinear()
.domain([0,maxY2])
.range([height-margin.bottom,margin.top]); 

// Create x scale
let xScale2 = d3.scaleBand()
.domain(d3.range(data.length))
.range([margin.left, width - margin.right])
.padding(0.1); 

// Add y axis to webpage 
svg2.append("g")
.attr("transform", `translate(${margin.left}, 0)`) 
.call(d3.axisLeft(yScale2)) 
.attr("font-size", '20px'); 

// Add x axis to webpage  
svg2.append("g")
.attr("transform", `translate(0,${height - margin.bottom})`) 
.call(d3.axisBottom(xScale2) 
.tickFormat(i => data[i].name))  
.attr("font-size", '20px'); 

//Bars

// Add bars to the webpage, bind events needed for tooltips 
svg2.selectAll(".bar") 
.data(data) 
.enter()  
.append("rect") 
.attr("class", "bar") 
.attr("x", (d,i) => xScale2(i)) 
.attr("y", (d) => yScale2(d.score)) 
.attr("height", (d) => (height - margin.bottom) - yScale2(d.score)) 
.attr("width", xScale2.bandwidth()) 
.on("mouseover", mouseover2) 
.on("mousemove", mousemove2)
.on("mouseleave", mouseleave2);
}); 









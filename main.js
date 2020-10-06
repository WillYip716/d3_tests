function graph(){

   let headerparser = new RegExp(/([A-Za-z ]*)\s([A-Za-z ]*)\s([A-Za-z ]*)/);
   let bodyparser = new RegExp(/([A-Za-z ]*)\s([0-9.]*)\s([0-9.]*)/);

   let data = document.getElementById("inputarea").value.split("\n");

   
   console.log(data);

   let headers = data.shift().match(headerparser);
   console.log(headers);
   let dataset=[];
   for(var i=0;i<data.length;i++){
      dataset.push(data[i].match(bodyparser));
   }

   console.log(dataset);
   

   const w = 600;
   const h = 600;
   const padding = 50;

   const xScale = d3.scaleLinear()
                  .domain([0, d3.max(dataset, (d) => d[2]+50)])
                  .range([padding, w - padding]);

   const yScale = d3.scaleLinear()
                  .domain([0, d3.max(dataset, (d) => parseInt(d[3])+50)])
                  .range([h - padding, padding]);

   const svg = d3.select("body")
               .append("svg")
               .attr("width", w)
               .attr("height", h);

   svg.selectAll("circle")
      .data(dataset)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d[2]))
      .attr("cy",(d) => yScale(d[3]))
      .attr("r", (d) => 5);

   svg.selectAll("text")
      .data(dataset)
      .enter()
      .append("text")
      .text((d) =>  (d[0]))
      .attr("x", (d) => xScale(d[2] + 20))
      .attr("y", (d) => yScale(d[3]))

   const xAxis = d3.axisBottom(xScale);
   // Add your code below this line
   const yAxis = d3.axisLeft(yScale);
   // Add your code above this line

   svg.append("g")
      .attr("transform", "translate(0," + (h - padding) + ")")
      .call(xAxis);

   // Add your code below this line

   svg.append("g")
      .attr("transform", "translate("+padding+",0)")
      .call(yAxis);


      svg.append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("y", 6)
      .attr("dy", ".50em")
      .attr("x", 0-(h/2))
      .attr("transform", "rotate(-90)")
      .text(headers[3]);

      svg.append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", w/2)
      .attr("y", h - 6)
      .text(headers[2]);



};

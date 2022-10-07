// const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];
// d3.select('body').selectAll('div')
//     .data(dataset)
//     .enter()
//     .append('div')
//     .attr('class','bar')
//     .style('height',(d)=>`${d}px`)

const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];

    const w = 500;
    const h = 100;

    const svg = d3.select("body")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h);

    svg.selectAll("rect")
       // Add your code below this line
        .data(dataset)
        .enter()
        .append('rect')
       // Add your code above this line
       .attr("x", 0)
       .attr("y", 0)
       .attr("width", 25)
       .attr("height", 100);
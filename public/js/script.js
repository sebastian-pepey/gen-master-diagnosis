var obj;

async function getData() {
    let res = await fetch('http://localhost:3010/api/v1/loadFile');
    let data = res.json();
    return data;
}

async function main() {

    const result = await getData();

    const data = result.data;

    data.forEach(d => {

        d.values.forEach(d => {

            d.date = new Date(d.date)

        })
    });

    const margin = { top: 10, right: 30, bottom: 30, left: 60 }

    const width = 800 - margin.left - margin.right;

    const height = 500 - margin.top - margin.bottom;


    const extentX = d3.extent(data[0].values, d => d.date)

    const extentY = d3.extent(data[0].values, d => d.value)

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var xScale = d3.scaleTime()
        .domain(extentX)
        .range([0, width])

    var yScale = d3.scaleLinear()
        .domain(extentY)
        .range([height, 0])

    var line = d3.line()
        .x(d => xScale(d.date))
        .y(d => yScale(d.value))

    var svg = d3.select('div#graph')
        .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
        .append('g')
            .attr('transform',`translate(${margin.left},${margin.top})`);

    var xAxis = svg.append('g')
            .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale).tickSizeOuter(0))
            .attr('class', 'x-axis')

    var yAxis = svg.append('g')
        .call(d3.axisLeft(yScale).tickSizeOuter(0))
            .attr('class', 'y-axis')

    const clip = svg.append("defs").append("svg:clipPath")
            .attr("id", "clip")
        .append("svg:rect")
            .attr("width", width )
            .attr("height", height )
            .attr("x", 0)
            .attr("y", 0);

    var lines = svg.append('g')
            .attr('class', 'lines')
            .attr("clip-path", "url(#clip)")

    lines.selectAll('.line-group')
        .data(data).enter()
        .append('g')
            .attr('class', 'line-group')
        .append('path')
            .attr('class', 'line')
            .attr('d', d => line(d.values))
        .style('stroke', (d, i) => color(d))
            .attr("fill", "none")
            .attr('transform', `translate(${2 * margin},${-0.5 * margin})`)
            .attr('class', 'line')

    var brush = d3.brushX()
        .extent([[0, 0], [width, height]])
        .on('end', (e) => updateChart(e))

    lines.append('g').call(brush)
            .attr('class','brush')

    d3.select('svg').on('dblclick', () => resetChart())

    function updateChart(e) {

        if (e.selection != null) {

            const brushExtent = [xScale.invert(e.selection[0]), xScale.invert(e.selection[1])]

            xScale.domain(brushExtent)

            lines.selectAll('.line').transition().duration(1000).attr('d', d => line(d.values))

            xAxis.selection('x-axis').transition().duration(1000).call(d3.axisBottom(xScale).tickSizeOuter(0))

            svg.select('.brush').call(brush.clear)

        }
    }

    function resetChart() {

        xScale.domain(extentX)

        lines.selectAll('.line').attr('d', d => line(d.values))

        xAxis.selection('x-axis').call(d3.axisBottom(xScale).tickSizeOuter(0))

    }
}

main();

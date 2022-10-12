var data = [
  { album: "Room 25", percent: 87 },
  { album: "Mr Morale & the Big Steppers", percent: 79 },
  { album: "Wasteland", percent: 75 },
  { album: "ApolloXXI", percent: 62 },
  { album: "The Suns Tirade", percent: 30 },
  { album: "Yung Bans Vol.5", percent: 15 },
];

//sort bars according to percentages
data = data.sort(function (a, b) {
  return d3.descending(a.percent, b.percent);
});

var margin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 510,
};

var width = 1200 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

var svg = d3
  .select("#bargraph")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scale
  .linear()
  .range([0, width])
  .domain([
    0,
    d3.max(data, function (d) {
      return d.percent;
    }),
  ]);

var y = d3.scale
  .ordinal()
  .rangeRoundBands([height, 0], 0.1)
  .domain(
    data.map(function (d) {
      return d.album;
    })
  );

// y axis show album names
var yAxis = d3.svg
  .axis()
  .scale(y)

  .tickSize(3)
  .orient("left");

var gy = svg.append("g").attr("class", "y axis").call(yAxis);

var bars = svg.selectAll(".bar").data(data).enter().append("g");

bars
  .append("rect")
  .attr("class", "bar")
  .attr("y", function (d) {
    return y(d.album);
  })
  .attr("height", y.rangeBand())
  .attr("x", 0)
  .attr("width", function (d) {
    return x(d.percent);
  });

bars
  .append("text")
  .attr("class", "label")

  .attr("y", function (d) {
    return y(d.album) + y.rangeBand() / 2 + 4;
  })

  .attr("x", function (d) {
    return x(d.percent) + 3;
  })
  .text(function (d) {
    return d.percent;
  });

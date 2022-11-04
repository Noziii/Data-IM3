//var data = [
//{ name: "Room 25", price: 87 },
// { name: "Mr Morale & the Big Steppers", price: 79 },
// { name: "Wasteland", price: 75 },
// { name: "ApolloXXI", price: 62 },
// { name: "The Suns Tirade", price: 30 },
// { name: "Yung Bans Vol.5", price: 15 },
//];

//API FETCH
async function getData() {
  var api_url =
    "http://makeup-api.herokuapp.com/api/v1/products.json?brand=dior&product_type=lipstick";
  var api_data = await fetch(api_url);
  var api_json = await api_data.json();
  var data = api_json.slice(0, 6);
  console.log(data);

  //sort bars according to price
  data = data.sort(function (a, b) {
    return d3.descending(a.price, b.price);
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
        return d.price;
      }),
    ]);

  var y = d3.scale
    .ordinal()
    .rangeRoundBands([height, 0], 0.2)
    .domain(
      data.map(function (d) {
        return d.name;
      })
    );

  // y axis show  names
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
      return y(d.name);
    })
    .attr("height", y.rangeBand())
    .attr("x", 0)
    .attr("width", function (d) {
      return x(d.price);
    });

  bars
    .append("text")
    .attr("class", "label")

    .attr("y", function (d) {
      return y(d.name) + y.rangeBand() / 2 + 4;
    })

    .attr("x", function (d) {
      return x(d.price) + 3;
    })
    .text(function (d) {
      return d.price;
    });
}
getData();

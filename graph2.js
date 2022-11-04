//const data = [
//{ name: "Room 25", price: 87 },
//{ name: "Mr Morale", price: 79 },
// { name: "Wasteland", price: 75 },
// { name: "ApolloXXI", price: 62 },
//{ name: "The Suns ", price: 30 },
// { name: "Yung Bans", price: 15 },
//];

//API FETCH
async function getData() {
  const api_url =
    "http://makeup-api.herokuapp.com/api/v1/products.json?brand=fenty";
  const api_data = await fetch(api_url);
  const api_json = await api_data.json();
  const data = api_json.slice(0, 3);
  console.log(data);

  const width = 900;
  const height = 450;
  const margin = { top: 50, bottom: 50, left: 50, right: 50 };

  const svg = d3
    .select("#graph")
    .append("svg")
    .attr("width", width - margin.left - margin.right)
    .attr("height", height - margin.top - margin.bottom)
    .attr("viewBox", [0, 0, width, height]);

  const x = d3
    .scaleBand()
    .domain(d3.range(data.length))
    .range([margin.left, width - margin.right])
    .padding(0.1);

  const y = d3
    .scaleLinear()
    .domain([0, 25])
    .range([height - margin.bottom, margin.top]);

  svg
    .append("g")
    .attr("fill", "royalblue")
    .selectAll("rect")
    .data(data.sort((a, b) => d3.descending(a.price, b.price)))
    .join("rect")
    .attr("x", (d, i) => x(i))
    .attr("y", (d) => y(d.price))
    .attr("title", (d) => d.price)
    .attr("class", "rect")
    .attr("height", (d) => y(0) - y(d.price))
    .attr("width", x.bandwidth());

  function yAxis(g) {
    g.attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y).ticks(null, data.format))
      .attr("font-size", "20px");
  }

  function xAxis(g) {
    g.attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat((i) => data[i].name))
      .attr("font-size", "14px");
  }

  const Tooltip = d3
    .select("#graph")
    .append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("background-color", "rgba(255,255,255,0.8)")
    .style("border-radius", "5px")
    .style("padding", "5px")
    .style("opacity", 0)
    .style("font-family", "Tahoma, Geneva, sans-serif")
    .style("font-size", "12pt");

  //Mouseover effects for tooltip
  const mouseover = function (d) {
    Tooltip.style("opacity", 1).style(
      "box-shadow",
      "5px 5px 5px rgba(0,0,0,0.2)"
    );
    d3.select(this).attr("fill", "lightblue");
  };
  const mousemove = function (d) {
    Tooltip.html("Price " + ": " + "$" + d.price)
      .style("left", d3.mouse(this)[0] + 300 + "px")
      .style("top", d3.mouse(this)[1] + 60 + "px");
  };
  const mouseleave = function (d) {
    Tooltip.style("opacity", 0);
    d3.select(this).attr("fill", "royalblue");
  };

  svg
    .selectAll("rect")
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave);
  svg.append("g").call(xAxis);
  svg.append("g").call(yAxis);
  svg.node();
}
getData();

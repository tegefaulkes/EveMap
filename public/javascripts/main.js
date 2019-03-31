//d3.select("body").append("p").text("yooo");

const width = 900;
const height = 900;

var svg = d3.select("body")
    .append("svg")
    .attr('width',width)
    .attr('height',height);

svg.append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "black");

var scale = d3.scale.linear()
    .domain([-600000000000000000,600000000000000000])
    .range([0,900]);

var color = d3.scale.linear().domain([0,1])
    .interpolate(d3.interpolateHcl)
    .range([d3.rgb("#ff0000"), d3.rgb('#00ff00')]);

//var colorScale = d3.scale.Sequential(d3["interpolate Rainbow"])
 //   .domain([20000001, 20000786]);


d3.json("/api/jumps",function(data){
    var rows = data.data;
    svg.selectAll("line")
        .data(rows)
        .enter()
        .append("line")
        .style("stroke","#a39f9d")
        .style("stroke-width", 0.5)
        .attr("x1",(d)=>{return scale(d.fx)})
        .attr("y1",(d)=>{return scale(-d.fz)})
        .attr("x2",(d)=>{return scale(d.tx)})
        .attr("y2",(d)=>{return scale(-d.tz)});
});

d3.json("/api/systems",function(data){
    console.log(data);
    var rows = data.data;
    console.log(rows);
    //const scale = 10000000000000000;


    // regionID        INTEGER,
    //     constellationID INTEGER,
    //     solarSystemID   INTEGER not null
    // primary key,
    //     solarSystemName VARCHAR(100),
    //     x               FLOAT,
    //     y               FLOAT,
    //     z               FLOAT,
    //     xMin            FLOAT,
    //     xMax            FLOAT,
    //     yMin            FLOAT,
    //     yMax            FLOAT,
    //     zMin            FLOAT,
    //     zMax            FLOAT,
    //     luminosity      FLOAT,
    //     border          BOOLEAN,
    //     fringe          BOOLEAN,
    //     corridor        BOOLEAN,
    //     hub             BOOLEAN,
    //     international   BOOLEAN,
    //     regional        BOOLEAN,
    //     constellation   BOOLEAN,
    //     security        FLOAT,
    //     factionID       INTEGER,
    //     radius          FLOAT,
    //     sunTypeID       INTEGER,
    //     securityClass   VARCHAR(2),

    svg.selectAll("cirlce")
        .data(rows)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            return scale(d.x);
        })
        .attr("cy", function (d) {
            return scale(-d.z);
        })
        .attr("r", 1)
        .attr("fill", function(d){
            return color(d.security)
        });

});



<template>
    <div id="mep">
        <h1>Map of Eve</h1>
    </div>
</template>

<script>
    import * as d3 from 'd3';

    var scale = d3.scaleLinear()
        .domain([-600000000000000000,600000000000000000])
        .range([0,900]);

    var color = d3.scaleLinear()
        .domain([0,1])
        .interpolate(d3.interpolateHcl)
        .range([d3.rgb("#ff0000"), d3.rgb('#00ff00')]);

    export default {
        name: "evemep",

        data(){
            return {
                msg: "loading",
                height: 900,
                width: 900,
                chartData: null,
                jumps: null
            }
        },

        // created(){
        //     this.fetchData();
        // },

        mounted() {

            d3.json("http://localhost:8000/api/jumps").then(function(d){this.jumps = d}.bind(this));
            d3.json("http://localhost:8000/api/systems").then(function(d){this.chartData = d}.bind(this));
            this.svg = d3.select(this.$el)
                .append('svg')
                .attr('width', this.width)
                .attr('height', this.height);

            this.svg.append("rect")
                .attr("width", "100%")
                .attr("height","100%")
                .attr("fill", "black");



        },

        watch:{
            chartData: function(){
                this.msg = "ChartData changed";
                this.svg.selectAll("circle")
                    .data(this.chartData.data)
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

                this.msg = "Done";
            },

            jumps: function(){
                var rows = this.jumps.data;
                this.svg.selectAll("line")
                    .data(rows)
                    .enter()
                    .append("line")
                    .style("stroke","#a39f9d")
                    .style("stroke-width", 0.5)
                    .attr("opacity", 0.2)
                    .attr("x1",(d)=>{return scale(d.fx)})
                    .attr("y1",(d)=>{return scale(-d.fz)})
                    .attr("x2",(d)=>{return scale(d.tx)})
                    .attr("y2",(d)=>{return scale(-d.tz)});
            }
        }
    }
</script>

<style scoped>

</style>

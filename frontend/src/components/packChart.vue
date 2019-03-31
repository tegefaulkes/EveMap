<template>
    <div>
        <h1>Circle Pack in D3</h1>
        <h2>{{ msg }}</h2>
        <svg
            :height="height"
            :width="width"
        >
            <g transform="translate(50,50)">
                <circle
                    v-for="c in output"
                    :key="c.id"
                    :r="c.r"
                    :cx="c.x"
                    :cy="c.y"
                    :fill="c.fill"
                    :stroke="c.stroke"
                    ></circle>
            </g>
        </svg>
    </div>
</template>

<script>
    import * as d3 from 'd3';

    export default {
        name: "packChart",

        props: ["tweetData"],

        data(){
            return {
                msg: "ok",
                height: 600,
                width: 600
            }
        },

        created() {
            this.colorScale = d3
                .scaleOrdinal()
                .range(["#ffffff","#3f1940","#2954aa","#3dff66"]);
        },

        methods: {
            packChart() {
                const packChart = d3.pack();
                packChart.size([500, 500]);
                packChart.padding(10);
                const output = packChart(this.packData).descendants();
                return output.map((d, i) => {
                    const fill = this.colorScale(d.depth);
                    return {
                        id: i + 1,
                        r: d.r,
                        x: d.x,
                        y: d.y,
                        fill,
                        stroke: "grey"
                    };
                });
            }
        },

        computed: {
            packData(){
                const nestedTweets = d3
                    .nest()
                    .key(d => d.user)
                    .entries(this.tweetData);

                const packableTweets = {id: "All Tweets", values: nestedTweets};
                return d3
                    .hierarchy(packableTweets, d => d.values)
                    .sum(d =>
                        d.retweets ? d.retweets.length + d.favorites.length + 1 : 1
                    );
            },
            output(){
                return this.packChart();
            }


        }
    }
</script>

<style scoped>

</style>

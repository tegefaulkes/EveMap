<template>
  <div id="app">
    <evemep></evemep>
  </div>
</template>

<script>
  //import HelloWorld from './components/HelloWorld.vue'
  //import packChart from './components/packChart.vue'
  import evemep from './components/map.vue'

  import * as d3 from "d3";

  export default {
  name: 'app',
  components: {
    evemep
  },
  data(){
    return {
      loadData: {}
    };
  },
  mounted() {
    //console.log("App loaded");
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.loadData = await d3.json("./tweets.json");
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

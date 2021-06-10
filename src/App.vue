<template>
  <div id="app">
    <Graph :autoGraph="false" />
    <Graph :autoGraph="true" />
  </div>
</template>

<script>
import Graph from './components/Graph.vue'

export default {
  name: 'App',
  components: {
    Graph
  },
  data() {
    return {
      autoGraph: false,
    }
  },
}
</script>

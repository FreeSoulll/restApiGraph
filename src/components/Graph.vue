<template>
  <div>
     <D3LineChart :config="chart_config" :datum="temp"></D3LineChart>
    <button v-if="autoGraph" @click="addData" :disabled ='countClick >= 1'>Старт</button>
    <button v-if="autoGraph" @click="stop" :disabled ='countClick < 1'>Стоп</button>
  </div>
</template>

<script>
import { D3LineChart } from 'vue-d3-charts'
import axios from 'axios'

export default {
  components: {
    D3LineChart,
  },
  props: ['autoGraph'],
  data() {
    return {
      countClick: 0,
      timer: '',
      currentId: '',
      temp: [],
      chart_data: [],
      chart_config: {
        values: ['temperature'],
        date: {
          key: 'localTime',
          inputFormat: '%Y-%m-%d %H:%M:%S',
          outputFormat: '%Y-%m-%d %H:%M:%S',
        },
       points: {
         visibleSize: 3,
         color: 'red'
        },

        color: {
          scheme: 'schemeSet2',
        },
      },
    }
  },
    methods: {
    async temperature() {
      try {
        const url = `https://my-json-server.typicode.com/FreeSoulll/fakeTemp/temperature${this.currentId}`
        const response = await axios.get(url)
        const results = response.data
        this.temp = results.map(post => ({
          id: post.id,
          temperature: post.temperature,
          localTime: post.localTime,
        }))
        console.log(results)
      } catch (err) {
        if (err.response) {
          console.log("Server Error:", err)
        } else if (err.request) {
          console.log("Network Error:", err)
        } else {
          console.log("Client Error:", err)
        }
      }
    },
    async sendData() {
       try {
        const temperature = Math.floor(Math.random() * 10 * 3)
        const localTime = (new Date()).toISOString().slice(0, 19).replace(/-/g, "-").replace("T", " ")
        const url = `https://my-json-server.typicode.com/FreeSoulll/fakeTemp/temperature${this.currentId}`
        const response = await axios.post(url, {
          "id": temperature,
          "temperature": temperature,
          "localTime": localTime
        })
        const results = response.data
        this.temp.push(results)
        console.log(results)
       } catch (err) {
        if (err.response) {
          console.log("Server Error:", err)
        } else if (err.request) {
          console.log("Network Error:", err)
        } else {
          console.log("Client Error:", err)
        }
      }
    },
    addData() {
      this.timer= setInterval(() => this.sendData(), 2000)
      this.countClick++
    },
    stop() {
      clearInterval(this.timer)
      this.countClick--
    },
    checkId() {
      if(this.autoGraph) {
        this.currentId = 2
      }
    },
  },
  beforeMount() {
    this.checkId()
  },
  mounted() {
    this.temperature()
  },
}
</script>

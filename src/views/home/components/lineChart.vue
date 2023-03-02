<template>
  <div class="echarts-box" :style="{ width: '100%'}">
    <div id="myEcharts" :style="{ width: '100%', height: '300px' }"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { onMounted, onUnmounted } from 'vue'
import axios from 'axios'

export default {
  name: "echartsBox",
  setup() {
    let echart = echarts;
    let chartData = [];

    // 基础配置一下 ECharts
    function initChart() {
      let chart = echart.init(document.getElementById("myEcharts"), "dark");

      chart.setOption({
        title: {
          text: 'Orders related data'
        },
        xAxis: {
          type: "category",
          data:chartData.map(item => item.week*(-1)+' week ago')
        },
        tooltip: {
          trigger: "axis"
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: 'order sale',
            data: chartData.map(item => item.sale),
            type: "line",
            smooth: true
          },
          {
            name: 'order amount',
            data:chartData.map(item => item.amount),
            type: "line",
            smooth: true
          }
        ]
      });

      window.onresize = function() {
        //自适应大小
        chart.resize();
      };
    }

    onMounted(async () => {
      // 使用axios获取数据
      const response = await axios.get('http://localhost:8080/api/home/orderData');
      chartData = response.data;
      initChart();
    });


    onUnmounted(() => {
      echart.dispose;
    });


    return { initChart };
  }
};
</script>

<style scoped>

</style>

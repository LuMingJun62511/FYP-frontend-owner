<template>

  <el-card :bordered="false" class="dashboard-bar-line header-solid" >
    <h6>本月销售额度</h6>
    <el-badge color="primary" class="badge-dot-primary" text="订单量" />
    <el-badge color="primary" class="badge-dot-secondary" text="销售额" />
    <Line
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
    />
  </el-card>



</template>

<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { Line } from 'vue-chartjs'
export default {
    name: 'home',
    components: { Line },
    data() {
      return {
        chartData: {//可以这样，我放很多个chartData，然后handle选中换数据组即可
          labels: [ 'January', 'February', 'March' ],
          datasets: [ {
            label: 'My First Dataset',
            data: [40, 20, 12]
          } ]
        },
        chartData2: {//可以这样，我放很多个chartData，然后handle选中换数据组即可
          labels: [ '下', '先', '想' ],
          datasets: [ {
            label: 'My First Dataset',
            data: [10, 20, 32]
          } ]
        },
        chartOptions: {
          responsive: true
        }
      }
    }
  }
</script>

<style scoped>

</style>

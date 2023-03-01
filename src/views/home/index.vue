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
        orderData: {//看看上月卖了多少单
          labels: [ 'January', 'February', 'March' ],
          datasets: [ {
            label: 'My First Dataset',
            data: [10, 20, 32]
          } ]
        },
        saleData: {//看看上月卖了多少钱
          labels: [ '下', '先', '想' ],
          datasets: [ {
            label: 'My First Dataset',
            data: [10, 20, 32]
          } ]
        },
        starCommodityByAmount:{//看看上月热销产品
          labels: [ 'January', 'February', 'March' ],
          datasets: [ {
            label: 'My First Dataset',
            data: [10, 20, 32]
          } ]
        },
        starCommodityBySale:{//看看上月最挣钱的
          labels: [ 'January', 'February', 'March' ],
          datasets: [ {
            label: 'My First Dataset',
            data: [10, 20, 32]
          } ]
        },
        chartOptions: {
          responsive: true
        }
      }
    },
  created () {
      console.log("做一次触发，查询一下有没有临期商品这样的东西")
  }
}
</script>

<style scoped>

</style>

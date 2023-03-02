<template>
  <el-card class="box-card">
    <p></p>
    <echarts-box></echarts-box>
  </el-card>
  <el-card class="box-card">
    <notifications></notifications>
  </el-card>

</template>

<script>
import EchartsBox from '@/views/home/components/lineChart.vue'
import Notifications from '@/views/home/components/notifications.vue'

export default {
  name: 'index',
  components: { Notifications, EchartsBox }
}
</script>

<style scoped>

</style>

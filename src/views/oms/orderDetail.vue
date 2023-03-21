<template>
  <p>items on the order</p>
  <el-table
    :data="orderItems"
    style="width: 100%">
    <el-table-column
      label="order id"
      prop="id"
      width="180">
    </el-table-column>
    <el-table-column
      label="status"
      prop="status"
      width="180">
    </el-table-column>
    <el-table-column
      label="payAmount"
      prop="payAmount"
      width="180">
    </el-table-column>
    <el-table-column
      label="notes"
      prop="note"
      width="180">
    </el-table-column>
  </el-table>
</template>

<script>
import axios from 'axios'

export default {
  name: 'orderDetail',
  props:['orderID'],
  data() {
    return {
      orderItems:[],
    }
  },
  created () {
    axios.get('http://localhost:8080/api/oms/orderItems/'+this.orderID).then(response => {
      this.orders = response.data
      // console.log(this.orders)
    })
  }
}
</script>

<style scoped>

</style>



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
    axios.get('http://localhost:8080/api/order/orderItems/'+this.orderID).then(response => {
      this.orders = response.data
      console.log(this.orders)
    })
  }
}
</script>

<style scoped>

</style>

<!--然后看样子，order就到此为止了，他的作用就是所有订单，然后看看某一个订单，在这里点击处理订单，就跳转到了ims的部分，是我这个系统的重头戏-->

<!--
设计一下order转receipt的过程，
这里，我遇到了逻辑上的一个问题，这个判断出问题怎么搞，我在全order里维护两个东西？统计性质的，
然后，写个检测处理函数，一旦处理这条订单的结果要使某一种商品归负数，则给这个订单标红，并跳过处理这个订单，记得每个订单初创的时候标记值默认没问题就好
处理函数思路是，for 循环； 复制一份维持的总计，总计减订单，出问题，则不将原数据指向复制品，不然就指向，出问题后，标红出问题的订单本身和出问题的商品

好，标红了，然后呢，我这时其实还没修改数据库，所以怎么把这宝贵的，维持好的一个大数组利用起来呢，
感觉我可以把这个数组传给下一个组件，
然后组件先获取，所有item,然后遍历

在处理订单的时候，请求到了所有相关的order items数据，差不多可以理解为数组的形式
在后面处理缺货问题的时候，会把其他的筛选去，剩下有缺货的留下来，那也就是留下来了有问题的数组，和维护好的那个暂时为仓储量的数组，

然后该怎么办呢，
然后，这里其实还是order转receipt的思路，不过多加了一步，就是得让店主自己选怎么生成这个receipt了，
-->



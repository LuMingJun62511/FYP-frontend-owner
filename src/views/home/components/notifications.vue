<template>
  <el-row>
    <el-col :span = "12">
      <el-row v-for="stockData in urgent">
        <el-col >
          <el-card style="background-color: rgb(250,242,201)">
            <p>warning:</p>
            <p>product {{stockData.productName}} get only {{stockData.productStock}} left, which should at least have {{stockData.productLowStock}}</p>
          </el-card>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span = "12">
      <el-row v-for="stockData in lowStock">
        <el-col >
          <el-card style="background-color: rgb(250,201,210)">
            <p>warning:</p>
            <p>product {{stockData.productName}} get only {{stockData.productStock}} left, which should at least have {{stockData.productLowStock}}</p>
          </el-card>
        </el-col>
      </el-row>
    </el-col>
  </el-row>

</template>
<!--这里就是一个很好的例子，我可以说，我没有简单的读数据，我还要计算一下，
因为他是每周固定时间发货，所以在发货日以前，有些货物是已经被预定了的，不应算在库存内的，
这就需要我找出未处理订单，统计订单上的各种货物，再在库存中的货物中减去这-->
<script>
export default {
  name: 'notifications',
  data(){
    return{
      lowStock:[
        {
          productId:401,
          productName:"eggplant1",
          productStock: 30,
          productLowStock:100
        },
        {
          productId:402,
          productName:"eggplant2",
          productStock: 30,
          productLowStock:80
        },
        {
          productId:403,
          productName:"eggplant3",
          productStock: 30,
          productLowStock:70
        },
        {
          productId:404,
          productName:"eggplant4",
          productStock: 40,
          productLowStock:200
        }
      ],
      urgent:[
        {
          productId:401,
          productName:"eggplant1",
          productStock: 30,
          productLowStock:100
        },
        {
          productId:402,
          productName:"eggplant2",
          productStock: 30,
          productLowStock:80
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>

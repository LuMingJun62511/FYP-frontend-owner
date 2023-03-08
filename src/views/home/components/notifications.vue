<template>
  <el-row>
    <el-col :span = "12">
      <el-row v-for="stockData in urgent">
        <el-col >
          <el-card style="background-color: rgb(250,242,201)">
            <p>warning:</p>
            <p>product {{stockData.productName}} have batches of commodities near bbd</p>
            <el-button @click="handleJump(stockData.productId)">
              check details
            </el-button>
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
            <el-button @click="handleJump(stockData.productId)">
              check details
            </el-button>
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
import axios from 'axios'

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
      ],
      urgent:[
        {
          productId:401,
          productName:"eggplant1",
        },
      ]
    }
  },
  methods:{
    handleJump(id){
      this.$router.push("/pms/specificProducts/"+id)
    }
  },
  async created () {
    //然后这里首先调用查询函数，在后端查一下有没有问题，
    await axios.get('http://localhost:8080/api/home/checkProducts').then(response => {

    })
    await axios.get('http://localhost:8080/api/home/getProducts').then(response => {
      this.lowStock = []
      this.urgent = []

      response.data.forEach(product =>{
        if (product.isLow === 1){
          this.lowStock.push({
            productId:product.id,
            productName:product.name,
            productStock: product.stock,
            productLowStock:product.lowStock
          })
        }

        if(product.isUrgent === 1){
          this.urgent.push({
            productId:product.id,
            productName:product.name,
          })
        }
      })

    })
  }
}
</script>

<style scoped>

</style>

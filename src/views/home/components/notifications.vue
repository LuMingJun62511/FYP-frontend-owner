<template>
  <div style="margin: 10px">
    <el-row>
      <el-col :span = "12">
        <el-row v-for="stockData in urgent">
          <el-col>
            <el-card style="background-color: rgb(250,242,201);margin: 10px">
              <p>warning:</p>
              <p>the commodity {{stockData.productName}} have batches of commodities are near bbd</p>
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
            <el-card style="background-color: rgb(250,201,210);margin: 10px">
              <p>warning:</p>
              <p>the commodity {{stockData.productName}} get only {{stockData.productStock}} left, which should at least have {{stockData.productLowStock}}</p>
              <el-button @click="handleJump(stockData.productId)">
                check details
              </el-button>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import axios from 'axios'
import Commodities from '@/views/pms/abstractCommodities.vue'

export default {
  name: 'notifications',
  components: { Commodities },
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
    await axios.get(process.env.VUE_APP_BASE_URL+'/home/checkProducts').then(response => {

    })
    await axios.get(process.env.VUE_APP_BASE_URL+'/home/getProducts').then(response => {
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

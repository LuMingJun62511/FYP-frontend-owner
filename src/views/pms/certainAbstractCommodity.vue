<template>
  <el-card v-if="product.is_urgent === 1" style="background-color: rgb(250,242,201); width: 75%; margin-left: auto; margin-right: auto; margin-bottom: 20px" >
  <p>Please note that there are batches of this commodity near their bbd </p>
</el-card>
  <el-card v-if="product.is_low === 1" style="background-color: rgb(250,201,210); width: 75%; margin-left: auto; margin-right: auto; margin-bottom: 20px" >
    <p>Please note that the stock of this commodity is low </p>
  </el-card>
  <el-row>
    <el-col :span="8">
      <el-card shadow="always" style="height: 500px">
        <el-form :model="product" v-if="!changing">
          <el-form-item label="id">
            <p>{{product.id}}</p>
          </el-form-item>
          <el-form-item label="name">
            <p>{{product.name}}</p>
          </el-form-item>
          <el-form-item label="category_name">
            <p>{{product.category_name}}</p>
          </el-form-item>
          <el-form-item label="price">
            <p>{{product.price}}</p>
          </el-form-item>
          <el-form-item label="stock">
            <p>{{product.stock}}</p>
          </el-form-item>
          <el-form-item label="low_stock">
            <p>{{product.low_stock}}</p>
          </el-form-item>
          <el-form-item label="to_be_outbound">
            <p>{{product.to_be_outbound}}</p>
          </el-form-item>
          <el-form-item label="sale">
            <p>{{product.sale}}</p>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="startChanging">change some data</el-button>
          </el-form-item>
        </el-form>
        <el-form :model="product" v-if="changing">
          <el-form-item label="id">
            <p>{{product.id}}</p>
          </el-form-item>
          <el-form-item label="name">
            <el-input v-model="product.name">{{product.name}}</el-input>
          </el-form-item>
          <el-form-item label="category">
            <el-select v-model="product.category_id" placeholder="please choose a category">
              <el-option
                v-for="item in options"
                :key="item.categoryID"
                :label="item.label"
                :value="item.categoryID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="price">
            <el-input v-model="product.price">{{product.price}}</el-input>
          </el-form-item>
          <el-form-item label="stock">
            <p>{{product.stock}}</p>
          </el-form-item>
          <el-form-item label="low_stock">
            <el-input v-model="product.low_stock">{{product.low_stock}}</el-input>
          </el-form-item>
          <el-form-item label="to_be_outbound">
            <p>{{product.to_be_outbound}}</p>
          </el-form-item>
          <el-form-item label="sale">
            <p>{{product.sale}}</p>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="finishChanging">finish changing</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
    <el-col :span="16">
      <div style="margin-left: 10px; height: 600px">
<!--        <p>chart here</p>-->
        <echarts-box2 :productID = this.product.id style="height: 300px"></echarts-box2>
        <el-card shadow="always" align-center style="height: 190px; margin-top: 10px ">
          <p>Batches Information</p>
          <div style="width: 600px;" align-center>
            <el-table
              :data="batches"
              style="width: 100%">
              <el-table-column
                label="id"
                prop="id"
                width="200">
              </el-table-column>
              <el-table-column
                label="amount"
                prop="amount"
                width="200">
              </el-table-column>
              <el-table-column
                label="bbd"
                prop="BBD"
                width="200">
              </el-table-column>
            </el-table>
          </div>
        </el-card>
<!--        这里一个问题，怎么往这个组件里传productID，解决了，图就画好了-->
      </div>
    </el-col>
  </el-row>





</template>

<script>
import axios from 'axios'
import EchartsBox2 from '@/views/pms/components/lineChart.vue'

export default {
  name: 'specificAbstractCommodity',
  components: { EchartsBox2 },
  data(){
    return{
      changing:false,
      options: [{
        categoryID: 'test1',
        label: 'test'
      }],
      product:{
        id:0,
        name:'test',
        category_id:0,
        category_name:'',
        price:0,
        stock:0,
        low_stock:0,
        to_be_outbound:0,
        sale:0,
      },
      batches:[
        // {
        //   id:0,
        //   amount:0,
        //   BBD:'',
        // }
      ]
    }
  },
  methods:{
    startChanging() {
      this.changing = true;
    },
    finishChanging(){
      // 这里其实是三步走，1，提交数据 2，查数据 3，更新一下子
      this.changing = false;
    //   这个提交数据还没做，写上去
    }
  },
  created () {
    this.product.id = this.$route.params.id

    axios.get(process.env.VUE_APP_BASE_URL+'/pms/findCategories').then(response => {
      this.options = []
      response.data.forEach(category =>{
        this.options.push({
          categoryID: category.id,
          label: category.name
        })
      })
    })

    axios.get(process.env.VUE_APP_BASE_URL+'/pms/productByID/'+this.product.id).then(response => {
      this.product.name = response.data.name
      this.product.category_id = response.data.category.id
      this.product.category_name = response.data.category.name
      this.product.price = response.data.price
      this.product.stock = response.data.stock
      this.product.low_stock = response.data.lowStock
      this.product.to_be_outbound = response.data.toBeOutbound
      this.product.sale = response.data.sale
      this.product.is_low = response.data.isLow
      this.product.is_urgent = response.data.isUrgent
    })

    axios.get(process.env.VUE_APP_BASE_URL+'/pms/findBatches/'+this.product.id).then(response => {
      const regex = /^(\d{4}-\d{2}-\d{2})/
      response.data.forEach(batch =>{
        const datePart = batch.bbd.match(regex)[1];
        this.batches.push({
          id: batch.id,
          amount: batch.amount,
          BBD:datePart
        })
      })
    })
  }
}
</script>


<style scoped>

</style>

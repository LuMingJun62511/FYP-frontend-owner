<template>
  <el-card shadow="always">
    <el-row>
      <el-col :span = "8">
        <p>the commodities belong to</p>
        <el-select v-model="categoryID" placeholder="please choose a category">
          <el-option
            v-for="item in options"
            :key="item.categoryID"
            :label="item.label"
            :value="item.categoryID">
          </el-option>
        </el-select>
      </el-col>

      <el-col :span = "8">
        <p>name like</p>
        <el-input name="username"
                  type="text"
                  v-model="nameStr"
                  autoComplete="on"
                  placeholder="enter commodity name please">
        </el-input>
      </el-col>

      <el-col :span = "8">
        <p>find such commodities</p>
        <el-button @click="findCommodities">search</el-button>
      </el-col>

    </el-row>
  </el-card>


  <el-card shadow="always">
    <el-table
      :data="products"
      style="width: 100%">
      <el-table-column
        label="product id"
        prop="id"
        width="180">
      </el-table-column>
      <el-table-column
        label="product name"
        prop="name"
        width="180">
      </el-table-column>
      <el-table-column
        label="stock"
        prop="stock"
        width="180">
      </el-table-column>
      <el-table-column
        label="price"
        prop="price"
        width="180">
      </el-table-column>
      <el-table-column
        label="operations"
        prop="id">
        <template v-slot="scope">
          <el-button @click="handleJump(scope.row.id)">
            check detail
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

</template>

<script>
import axios from 'axios'

export default {
  name: 'commodities',

  data(){
    return {
      options: [{
        categoryID: 'test1',
        label: 'test'
      }],
      categoryID: '',
      nameStr: '',
      products:[
        // { id:401,
        // name:'',
        // stock:'',
        // price:'', }
      ]
    }
  },
  methods:{
    findCommodities(){
      if(this.nameStr === ''){//如果用户没写，那不能瞎找
        axios.get(process.env.VUE_APP_BASE_URL+'/pms/productsByCategory/'+this.categoryID).then(response => {
          this.products = response.data
        })
      }else if(this.categoryID === ''){//如果用户没写，那不能瞎找
        axios.get(process.env.VUE_APP_BASE_URL+'/pms/productsByNameLike/'+this.nameStr).then(response => {
          this.products = response.data
        })
      }else {
        axios.get(process.env.VUE_APP_BASE_URL+'/pms/productsByBoth/'+this.categoryID+'/'+this.nameStr).then(response => {
          this.products = response.data
        })
      }
    },
    handleJump(id){
      this.$router.push('/pms/specificProducts/'+id)
    }
  },
  created () {
    axios.get(process.env.VUE_APP_BASE_URL+'/pms/findCategories').then(response => {
      this.options = []
      response.data.forEach(category =>{
        this.options.push({
          categoryID: category.id,
          label: category.name
        })
      })
    })
  }
}
</script>

<style scoped>
.el-card{
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>

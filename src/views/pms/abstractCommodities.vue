<template>
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
      <el-button @click="findCommodities">find products</el-button>
    </el-col>

  </el-row>

  <div>
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
  </div>

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
        axios.get('http://localhost:8080/api/pms/productsByCategory/'+this.categoryID).then(response => {
          this.products = response.data
        })
      }else {
        axios.get('http://localhost:8080/api/pms/productsByCategoryAndNameLike/'+this.categoryID+'/'+this.nameStr).then(response => {
          this.products = response.data
        })
      }
    },
    handleJump(id){
      this.$router.push('/pms/specificProducts/'+id)
    }
  },
  created () {
    axios.get('http://localhost:8080/api/pms/findCategories').then(response => {
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

</style>

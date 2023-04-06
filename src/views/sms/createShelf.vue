<template>
  <p>create a new shelf</p>
  <el-row>
    <el-col :span="6"></el-col>
    <el-col :span="12">
      <el-card shadow="always">
        <el-row>
          <el-col :span="8"> id </el-col>
          <el-col :span="16">
            <el-input v-model="newShelf.id"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8"> category </el-col>
          <el-col :span="16">
            <el-select v-model="newShelf.categoryId" placeholder="please choose a category">
              <el-option
                v-for="item in options"
                :key="item.categoryID"
                :label="item.label"
                :value="item.categoryID">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8"> row number </el-col>
          <el-col :span="16">
            <el-input v-model="newShelf.rowNum"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8"> column number </el-col>
          <el-col :span="16">
            <el-input v-model="newShelf.colNum"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8"> note </el-col>
          <el-col :span="16">
            <el-input v-model="newShelf.note"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-button type="primary" @click="createShelf">create a shelf</el-button>
          </el-col>
        </el-row>

      </el-card>
    </el-col>
    <el-col :span="6"></el-col>
  </el-row>

</template>

<script>
import axios from 'axios'

export default {
  name: 'createShelf',
  data(){
    return{
      options: [{
        categoryID: 'test1',
        label: 'test'
      }],
      newShelf:{
        id:0,
        categoryId:0,
        rowNum:0,
        colNum:0,
        note:"lalala"
      }

    }
  },
  methods:{
    //新创建的shelf还得自动填充一下，
    async createShelf(){
      await axios.post('http://localhost:8080/api/sms/createOneShelf',this.newShelf).then(response =>{
        console.log(response.status)
      })

      await axios.post('http://localhost:8080/api/sms/autoFillShelf/',this.newShelf).then(response =>{
        console.log(response.status)
      })
      await this.handleJump(this.newShelf.id)
    },

    handleJump(id){
      this.$router.push('/sms/shelf/'+id)
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
.el-row {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>

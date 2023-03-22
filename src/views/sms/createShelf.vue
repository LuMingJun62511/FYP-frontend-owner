<template>
  <p>创建新shelf</p>
  <el-form :data="newShelf">
    <el-form-item label="category">
      <el-select v-model="newShelf.category_id" placeholder="please choose a category">
        <el-option
          v-for="item in options"
          :key="item.categoryID"
          :label="item.label"
          :value="item.categoryID">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="row number">
      <el-input v-model="newShelf.rowNum"></el-input>
    </el-form-item>
    <el-form-item label="column number">
      <el-input v-model="newShelf.colNum"></el-input>
    </el-form-item>
    <el-form-item label="note">
      <el-input v-model="newShelf.note"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="createShelf">结束创建</el-button>
    </el-form-item>
  </el-form>
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
        category_id:0,
        rowNum:0,
        colNum:0,
        note:"lalala"
      }

    }
  },
  methods:{
    //新创建的shelf还得自动填充一下，
    createShelf(){

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

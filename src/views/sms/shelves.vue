<template>
  <div>
    <el-table
      :data="shelves"
      style="width: 100%">
      <el-table-column
        label="shelf id"
        prop="id"
        width="180">
      </el-table-column>
      <el-table-column
        label="shelf rows"
        prop="rowNum"
        width="180">
      </el-table-column>
      <el-table-column
        label="shelf columns"
        prop="colNum"
        width="180">
      </el-table-column>
      <el-table-column
        label="notes"
        prop="note"
        width="180">
      </el-table-column>
      <el-table-column
        label="operations"
        prop="id">
        <template v-slot="scope">
          <el-button @click="handleJump(scope.row.id)">
            edit this shelf {{scope.row.id}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
import axios from 'axios'

export default {
  name: 'shelves',
  data() {
    return {
      shelves:[],
    //   tableData: [{
    //     date: '2016-05-02',
    //     name: '王小龙',
    //     address: '上海市普陀区金沙江路 1518 弄',
    //     t1: 10
    //   }, {
    //     date: '2016-05-04',
    //     name: '王小虎',
    //     address: '上海市普陀区金沙江路 1517 弄',
    //     t1: 10
    //   }, {
    //     date: '2016-05-01',
    //     name: '王小鹏',
    //     address: '上海市普陀区金沙江路 1519 弄',
    //     t1: 10
    //   }, {
    //     date: '2016-05-03',
    //     name: '王小牛',
    //     address: '上海市普陀区金沙江路 1516 弄',
    //     t1: 10
    //   }]
    }
  },
  created () {
    const _this = this
    axios.get('http://localhost:8080/api/sms/shelves').then(function (res) {
      _this.shelves = res.data
    })
  },
  methods:{
    handleJump(id){
      this.$router.push('/sms/shelf/'+id)
    }
  }




}
</script>

<style scoped>

</style>

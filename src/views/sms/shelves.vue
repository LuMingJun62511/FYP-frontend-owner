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

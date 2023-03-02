<template>
  <el-row>
    <p>这里面放筛选栏，根据这里面的条件筛选出对应的abstract，筛选栏至少有商品种类</p>
    <el-col>

    </el-col>
    <el-col>
      <p>category belong to</p>
      <el-input name="username"
                type="text"
                v-model="categoryId"
                autoComplete="on"
                placeholder="categoryId here">
      </el-input>
    </el-col>
    <el-col>
      <p>name like</p>
      <el-input name="username"
                type="text"
                v-model="nameStr"
                autoComplete="on"
                placeholder="enter your username please">
      </el-input>
    </el-col>

  </el-row>

  <p>这里面放结果，抽象商品的结果，点进去才是看仓储信息啥的</p>
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
        prop="rowNum"
        width="180">
      </el-table-column>
      <el-table-column
        label="stock"
        prop="colNum"
        width="180">
      </el-table-column>
      <el-table-column
        label="price"
        prop="note"
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
import commodityCard from '@/views/sms/components/commodityCard.vue'

export default {
  name: 'commoditys',
  methods: {
    commodityCard () {
      return commodityCard
    }
  },
  data(){

  }
}
</script>

<style scoped>

</style>

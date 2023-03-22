<template>
  <p>有哪个receipt的东西被退货了，就查一下看看</p>
  <el-input name="receiptId"
            type="text"
            v-model="receiptId"
            autoComplete="on"
            placeholder="enter receipt ID please">
  </el-input>
  <p>下面是查出来的，然后写点函数，更新一下batch, product, receiptItem</p>
</template>

<script>
export default {
  name: 'inbound',
  data(){
    return{
      receiptId:''
    }
  },
  methods:{

  },
  created () {

  }
}
</script>

<style scoped>

</style>

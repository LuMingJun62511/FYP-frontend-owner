<template>
  <el-card class="card">
    <div ondragstart="return false">
      <img :src="require('@/assets/images/' + imgUrl + '.jpg')" class="image" alt="@/assets/images/image-not-found-icon.png" >
    </div>
    <el-row align="middle">
      <el-col v-if="checkNew(createdTime)" :span = "6">
        <img src="@/assets/icons/new.png" style="vertical-align: middle;max-width: 20px;max-height:20px "/>
      </el-col>
      <el-col v-if="checkUrgent(isUrgent)" :span = "6">
        <img src="@/assets/icons/urgent.png" style="vertical-align: middle;max-width: 20px;max-height:20px "/>
      </el-col>
      <el-col v-if="checkSale(sale)" :span = "6">
        <img src="@/assets/icons/hotSale.png" style="vertical-align: middle;max-width: 20px;max-height:20px "/>
      </el-col>
    </el-row>
    <div>
      <span>{{ name }}</span>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'commodityCard',
  props:['imgUrl','name','isUrgent','sale','createdTime'],
  methods:{
    checkNew(createdTime){
      let isNew = this.calcuTime(createdTime)
      return isNew <= 30
    },
    checkUrgent(isUrgent){
      return isUrgent === 1
    },
    checkSale(sale){
      return sale >= 25
    },
    calcuTime(d1) {//d1作为一个变量传进来
      //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
      d1 = d1.replace('T', " ")
      d1 = d1.replace('Z', "")
      // let dateEnd = new Date();//获取当前时间
      let dateEnd = new Date(2023, 4, 10);//改为Dday时间了，js特有的，月份从0开始，所以这就是5月10号
      let dateDiff = dateEnd.getTime() - new Date(d1).getTime();//时间差的毫秒数
      let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
      return dayDiff
    }
  },

}
</script>

<style scoped>
.card{
  padding: 0px;
  height: 150px;
  width: 150px;
  border-style:solid;
  border-width:1px;
}
.image{
  height: 80px;
  width: 80px;
}
</style>

<template>
  <el-card class="card">
    <img :src="require('@/assets/images/' + imgUrl + '')" class="image" alt="@/assets/images/image-not-found-icon.png">
    <div >
      <span>{{ name }}</span>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'commodityCard',
  props:['imgUrl','name']
}
</script>

<style scoped>
.card{
  padding: 0px;
  height: 130px;
  width: 150px;
  border-style:solid;
  border-width:1px;
}
.image{
  max-height: 80px;
  max-width: 80px;
}
</style>

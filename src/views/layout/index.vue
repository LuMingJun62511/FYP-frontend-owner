<template>
  <el-container class="container">
    <el-header class="header">
<!--      Header-->
      <el-row>
        <el-col :span="1">
          <el-button type="text" @click="handleToggle">
            三
          </el-button>
        </el-col>
        <el-col :span="1">
          <img src="@/assets/images/user.png" class="image">
        </el-col>
      </el-row>
    </el-header>

    <el-container style="display: flex">
      <Sidebar :isCollapse="isCollapse"/>
      <el-main class="main">
        <router-view/>
      </el-main>
    </el-container>
  </el-container>

</template>


<script>
import Sidebar from '@/views/layout/sidebar.vue';

export default {
  name: 'AppLayout',
  data() {
    return {
      isCollapse: false,
    }
  },

  methods: {
    handleToggle() {
      this.isCollapse = !this.isCollapse
    }
  },
  components:{Sidebar}
}

</script>

<style scoped>
  /*.container {*/
  /*  height: 100vh;*/
  /*}*/

  .main{
    border-style:solid;
    border-width:1px;
  }

  .header{
    background: #a1e9d2;
    height:80px;
  }
  .image{
    max-width: 70px;
    max-height: 70px;
  }
</style>

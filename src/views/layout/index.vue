<template>
  <div class="common-layout">
    <el-container class="container">
      <el-header class="header">
        Header
        <el-row>
          <el-col :span="1">
            <el-button type="text" @click="handleToggle">
              三
            </el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside class="aside">
          <Sidebar :isCollapse="isCollapse"/>
        </el-aside>
        <el-container>
          <el-main class="main">
            <router-view/>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
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
  .container {
    height: 100vh;
  }
  .aside{
    /*background: #797979;*/
    width:230px;
    display: flex;
  }
  .header{
    background: #a1e9d2;
    height:15vh;
  }
</style>

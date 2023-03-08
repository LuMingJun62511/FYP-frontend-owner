<template>
  <el-container class="container" >
    <el-header class="header">
      <el-row
        class="header-row"
        v-if="!checkLogin"
        align="middle"
        style="margin-top: 10px"
      >
        <el-col :span="1"  style="vertical-align: middle">
          <img src="@/assets/icons/menu.png" style="max-height: 35px; max-width: 30px" @click="handleToggle">
        </el-col>
        <el-col :span="4" >
          <!--        <div >-->
          <img src="@/assets/icons/home.png" style="vertical-align: middle;max-width: 50px;max-height:50px "/>
          <router-link to="/home" style="text-decoration: none; font-size: 24px">Home</router-link>
          <!--        </div>-->
        </el-col>
        <el-col :span="4" :offset="11">
          <div class="header-button">
            <img src="@/assets/icons/login.png" style="vertical-align: middle;max-width: 50px;max-height:50px "/>
            <router-link to="/login" style="text-decoration: none; font-size: 24px">log in</router-link>
          </div>
        </el-col>
        <el-col :span="4" >
          <div class="header-button">
            <img src="@/assets/icons/signup.png" style="vertical-align: middle;max-width: 50px;max-height:50px "/>
            <router-link to="/signup" style="text-decoration: none; font-size: 24px">sign up</router-link>
          </div>
        </el-col>
      </el-row>

      <el-row
        v-if="checkLogin"
        class="header-row"
        align="middle"
        style="margin-top: 10px"
      >
        <el-col :span="1">
          <img src="@/assets/icons/menu.png" style="max-height: 35px; max-width: 30px" @click="handleToggle">
        </el-col>
        <el-col :span="4">
          <div class="header-button">
            <img src="@/assets/icons/home.png" style="vertical-align: middle;max-width: 50px;max-height:50px "/>
            <router-link to="/home" style="text-decoration: none; font-size: 24px">Home</router-link>
          </div>
        </el-col>
        <el-col :span="4" :offset="11">
          <div class="header-button">
            <img src="@/assets/icons/signup.png" style="vertical-align: middle;max-width: 50px;max-height:50px "/>
            <router-link to="/signup" style="text-decoration: none; font-size: 24px">sign up</router-link>
          </div>
        </el-col>
        <el-col :span="4" >
          <div class="header-button" @click="handleLogOut">
            <img src="@/assets/icons/logout.png" style="vertical-align: middle;max-width: 50px;max-height:50px" @click="handleLogOut"/>
            <router-link to="/logout" style="text-decoration: none; font-size: 24px">log out</router-link>
          </div>
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
  computed:{
    checkLogin(){
      return this.$store.state.isLogin
    },
  },

  methods: {
    handleToggle() {
      this.isCollapse = !this.isCollapse
    },
    handleLogOut(){
      this.$store.commit('SET_LOGIN',false)
      this.$router.push('/login')
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

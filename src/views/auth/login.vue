<template xmlns:el-col="http://www.w3.org/1999/html">
  <div style="height: 10%;">
    <el-row
      class="header-row"
      v-if="!checkLogin"
      align="middle"
    >
      <el-col :span="4" :offset="1">
        <img src="@/assets/icons/home.png" style="vertical-align: middle;max-width: 50px;max-height:50px "/>
        <router-link to="/home" style="text-decoration: none; font-size: 24px">Home</router-link>
     </el-col>
<!--      <el-col :span="4" :offset="11">-->
<!--        <img src="@/assets/icons/login.png" style="vertical-align: middle;max-width: 50px;max-height:50px "/>-->
<!--        <router-link to="/login" style="text-decoration: none; font-size: 24px">log in</router-link>-->
<!--      </el-col>-->
      <el-col :span="4" :offset="15">
        <img src="@/assets/icons/signup.png" style="vertical-align: middle;max-width: 50px;max-height:50px "/>
        <router-link to="/signup" style="text-decoration: none; font-size: 24px">sign up</router-link>
      </el-col>
    </el-row>

  </div>

  <div style="height: 70%;">
    <el-row>
      <el-col :span="10" :offset="7" style="margin-top: 60px;">
        <el-card class="login-form-layout" >
          <el-form autoComplete="on"
                   :model="loginForm"
                   label-position="left">
            <h2 class="login-title color-main" v-if="userType">Welcome, store owner </h2>
            <h2 class="login-title color-main" v-if="!userType"> Developer mod </h2>
            <el-form-item prop="username">
              <el-input name="username"
                        type="text"
                        v-model="loginForm.username"
                        autoComplete="on"
                        placeholder="enter your username please">
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input name="password"
                        type="password"
                        @keyup.enter="handleLogin"
                        v-model="loginForm.password"
                        autoComplete="on"
                        placeholder="enter your password please">
              </el-input>
            </el-form-item>
            <el-form-item style="margin-bottom: 60px;">
              <div style="width: 15%"></div>
              <el-button v-if="userType" style="width: 70%;" type="primary" @click="handleLogin(loginForm)" >
                login
              </el-button>

              <el-button v-if="!userType" style="width: 70%;" type="primary" @click="handleLogin(loginForm)" >
                login
              </el-button>
              <div style="width: 15%"></div>
            </el-form-item>
            <el-form-item style="margin-bottom: 6px; text-align: center">
              <p v-if="userType" @click="handleChangeMod">developer mod?</p>
              <p v-if="!userType" @click="handleChangeMod">user mod?</p>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>

  <div class="footer">
    <img src="@/assets/images/setu.png" class="setu" style="vertical-align: middle;max-width: 100px;max-height:100px ">
    <p>Shop Ease developed by Yikun Fan</p>
  </div>

</template>

<script>

import axios from 'axios'

export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      userType: true
    //   for store owner is true, for admin is false
    }
  },
  computed:{
    checkLogin(){
      return this.$store.state.isLogin
    },
  },
  methods:{
    handleLogin (loginForm) {
      const store = this.$store
      if(this.userType){//store owner
        axios.post(process.env.VUE_APP_BASE_URL+'/ownerLogin',loginForm).then(response => {
          if(response.data){
            store.commit('SET_LOGIN',response.data)
            this.$router.push('/')
          }
        })
      }else {//admin store owner
        axios.post(process.env.VUE_APP_BASE_URL+'/adminLogin',loginForm).then(response => {
          if(response.data){
            store.commit('SET_LOGIN',response.data)
            this.$router.push('/')
          }
        })
      }

    },
    handleChangeMod(){
      this.userType = !this.userType;
    }
  }
}
</script>

<style scoped>
.header-row {
  background-color:#a1e9d2;
  height:80px;
}

.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #a1e9d2;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 10%;
  text-align: center;
}

</style>

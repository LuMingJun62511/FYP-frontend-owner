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
      <el-col :span="4" :offset="11">
        <img src="@/assets/icons/login.png" style="vertical-align: middle;max-width: 50px;max-height:50px "/>
        <router-link to="/login" style="text-decoration: none; font-size: 24px">log in</router-link>
      </el-col>
      <el-col :span="4" >
        <img src="@/assets/icons/signup.png" style="vertical-align: middle;max-width: 50px;max-height:50px "/>
        <router-link to="/signup" style="text-decoration: none; font-size: 24px">sign up</router-link>
      </el-col>
    </el-row>

    <el-row
      v-if="checkLogin"
      class="header-row"
      align="middle"
    >
      <el-col :span="4" :offset="1">
        <img src="@/assets/icons/home.png" style="vertical-align: middle;max-width: 50px;max-height:50px "/>
        <router-link to="/home" style="text-decoration: none; font-size: 24px">Home</router-link>
      </el-col>
      <el-col :span="4" :offset="15">
        <img src="@/assets/icons/logout.png" style="vertical-align: middle;max-width: 50px;max-height:50px "/>
        <router-link to="/home" style="text-decoration: none; font-size: 24px">log out</router-link>
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
            <h2 class="login-title color-main" v-if="!userType">developer mod </h2>
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

  <div style="height: 20%;">
    <img src="@/assets/images/login_center_bg.png" class="login-center-layout">
  </div>

</template>

<script>

import axios from 'axios'

export default {
  name: 'myLogin',
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
      axios.post('http://localhost:8080/login',loginForm).then(function (res) {
        store.commit('SET_LOGIN',res.data)
      })
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
/*body {*/
/*  background: url("@/assets/images/login_center_bg.png") no-repeat center center*/
/*  fixed;*/
/*  -webkit-background-size: cover;*/
/*  -moz-background-size: cover;*/
/*  -o-background-size: cover;*/
/*  background-size: cover;*/
/*}*/
.login-center-layout {
  background: #a1e9d2;
  /*width: auto;*/
  /*height: auto;*/
  max-width: 100%;
  max-height: 100%;
  margin-top: 100px;
}

</style>

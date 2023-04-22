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
        <img src="@/assets/icons/login.png" style="vertical-align: middle;max-width: 50px;max-height:50px "/>
        <router-link to="/login" style="text-decoration: none; font-size: 24px">login</router-link>
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
        <div class="header-button" @click="handleLogOut">
          <img src="@/assets/icons/logout.png" style="vertical-align: middle;max-width: 50px;max-height:50px" @click="handleLogOut"/>
          <router-link to="/logout" style="text-decoration: none; font-size: 24px">log out</router-link>
        </div>
      </el-col>
    </el-row>
  </div>

  <div style="height: 70%;">
    <el-row>
      <el-col :span="10" :offset="7" style="margin-top: 60px;">
        <el-card class="login-form-layout" >
          <el-form autoComplete="on"
                   :model="signUpForm"
                   label-position="left">
            <h2 class="login-title color-main">Sign up as a new store owner </h2>
            <el-form-item prop="username">
              <el-input name="username"
                        type="text"
                        v-model="signUpForm.username"
                        autoComplete="on"
                        placeholder="enter your username please">
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input name="password"
                        type="password"
                        @keyup.enter="handleSignup(signUpForm)"
                        v-model="signUpForm.password"
                        autoComplete="on"
                        placeholder="enter your password please">
              </el-input>
            </el-form-item>
            <el-form-item style="margin-bottom: 60px;">
              <div style="width: 15%"></div>
              <el-button style="width: 70%;" type="primary" @click="handleSignup(signUpForm)" >
                sign up
              </el-button>
              <div style="width: 15%"></div>
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
  name: 'signup',
  data () {
    return {
      signUpForm: {
        username: '',
        password: ''
      },
    }
  },
  computed:{
    checkLogin(){
      return this.$store.state.isLogin
    },
  },
  methods:{
    handleSignup (signUpForm) {
      axios.post(process.env.VUE_APP_BASE_URL+'/signup',signUpForm).then(function (res) {

      })
    },
    handleLogOut(){
      this.$store.commit('SET_LOGIN',false)
      this.$router.push('/login')
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

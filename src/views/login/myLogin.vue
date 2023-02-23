<template>
  <div>
    <div v-if="!checkLogin">
      <p>没登陆</p>
    </div>
    <div v-if="checkLogin">
      <p>登陆了</p>
    </div>
<!--    <nav class="navbar navbar-expand navbar-dark bg-dark">-->
<!--&lt;!&ndash;      <a href="/" class="navbar-brand">bezKoder</a>&ndash;&gt;-->
<!--      <div class="navbar-nav mr-auto">-->
<!--        <li class="nav-item">-->
<!--          <router-link to="/home" class="nav-link">-->
<!--            <font-awesome-icon icon="home" /> Home-->
<!--          </router-link>-->
<!--        </li>-->
<!--&lt;!&ndash;        然后这里的三个，三种角色对应三个按钮&ndash;&gt;-->
<!--        <li v-if="showAdminBoard" class="nav-item">-->
<!--          <router-link to="/admin" class="nav-link">Admin Board</router-link>-->
<!--        </li>-->
<!--        <li v-if="showModeratorBoard" class="nav-item">-->
<!--          <router-link to="/mod" class="nav-link">Moderator Board</router-link>-->
<!--        </li>-->
<!--        <li class="nav-item">-->
<!--          <router-link v-if="currentUser" to="/user" class="nav-link">User</router-link>-->
<!--        </li>-->
<!--      </div>-->
<!--&lt;!&ndash;如果没登陆，就显示为登陆加注册&ndash;&gt;-->
<!--      <div v-if="!checkLogin" class="navbar-nav ml-auto">-->
<!--        <li class="nav-item">-->
<!--          <router-link to="/register" class="nav-link">-->
<!--            <font-awesome-icon icon="user-plus" /> Sign Up-->
<!--          </router-link>-->
<!--        </li>-->
<!--        <li class="nav-item">-->
<!--          <router-link to="/login" class="nav-link">-->
<!--            <font-awesome-icon icon="sign-in-alt" /> Login-->
<!--          </router-link>-->
<!--        </li>-->
<!--      </div>-->
<!--&lt;!&ndash;登陆之后是这么显示的&ndash;&gt;-->
<!--&lt;!&ndash; currentUser是那个在验证过后，有资格被存在session里面的user对象，所以设计思路明确了，应该做一个传进去用户名密码，返回带重要数据的api     &ndash;&gt;-->
<!--      <div v-if="checkLogin" class="navbar-nav ml-auto">-->
<!--        <li class="nav-item">-->
<!--          <router-link to="/profile" class="nav-link">&lt;!&ndash; 这是前往个人信息页         &ndash;&gt;-->
<!--            &lt;!&ndash;            <font-awesome-icon icon="user" />&ndash;&gt;-->
<!--            {{ currentUser.username }}-->
<!--          </router-link>-->
<!--        </li>-->
<!--        <li class="nav-item">-->
<!--          <a class="nav-link" @click="logOut">-->
<!--            <font-awesome-icon icon="sign-out-alt" /> LogOut-->
<!--          </a>-->
<!--        </li>-->
<!--      </div>-->
<!--    </nav>-->
  </div>


  <div>
    <el-card class="login-form-layout">
      <el-form autoComplete="on"
               :model="loginForm"
               label-position="left">
        <h2 class="login-title color-main">Login page</h2>
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
        <el-form-item style="margin-bottom: 60px;text-align: center">
          <el-button style="width: 80%" type="primary" @click="handleLogin(loginForm)">
            login
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <img :src="require('@/assets/images/login_center_bg.png')" class="login-center-layout">

    <router-link to="sms/shelfManage">sms</router-link>
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
  }
}
</script>

<style scoped>

</style>

import { createStore } from 'vuex'

const store = createStore({
  state: {
    username:null,
    isLogin:false,
  },
  mutations: {
    SET_NAME: (state, name) => {
      state.username = name
    },
    SET_LOGIN: (state, login) => {
      state.isLogin = login
    }
  }
})

export default store

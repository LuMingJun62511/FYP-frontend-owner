import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/layout/index.vue'
import store from '@/store/index'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/Login.vue'),
  },

  {
    path: '/signup',
    name: 'Signup',
    component: () => import('@/views/auth/signup.vue'),
  },

  {
    path: '/',
    name: 'HomeRoot',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
      },
    ],
    beforeEnter(to, from, next){
      if (!store.state.isLogin && to.name !== 'Login' ) next({ name: 'Login' })
      else next()
    },
  },

  {
    path: '/ims',
    name: 'imsRoot',
    component: Layout,
    children: [
      {
        path: 'inbound',
        name: 'inbound',
        component: () => import('@/views/ims/inbound.vue'),
      },
      {
        path: 'outbound',
        name: 'outbound',
        component: () => import('@/views/ims/outbound.vue'),
      },

    ],
    beforeEnter(to, from, next){
      if (!store.state.isLogin && to.name !== 'Login' ) next({ name: 'Login' })
      else next()
    },
  },

  {
    path: '/oms',
    name: 'omsRoot',
    component: Layout,
    redirect: '/oms/orderDealing',//默认导向这里
    children: [
      {
        path: 'orderDealing',
        name: 'orderDealing',
        component: () => import('@/views/oms/orderDealing.vue'),
      },
      {
        path: 'detail/:id',
        name: 'detail',
        component: () => import('@/views/oms/orderDetail.vue'),
      },
    ],
    beforeEnter(to, from, next){
      if (!store.state.isLogin && to.name !== 'Login' ) next({ name: 'Login' })
      else next()
    },
  },

  {
    path: '/pms',
    name: 'pmsRoot',
    component: Layout,
    redirect: '/pms/allProducts',//默认导向这里
    children: [
      {
        path: 'allProducts',
        name: 'allProducts',
        component: () => import('@/views/pms/abstractCommodities.vue'),
      }, {
        path: 'specificProducts/:id',
        name: 'specificProducts',
        component: () => import('@/views/pms/certainAbstractCommodity.vue'),
      },
    ],
    beforeEnter(to, from, next){
      if (!store.state.isLogin && to.name !== 'Login' ) next({ name: 'Login' })
      else next()
    },
  },

  {
    path: '/sms',
    name: 'smsRoot',
    component: Layout,
    children: [
      {
        path: 'shelfCreation',
        name: 'shelfCreation',
        component: () => import('@/views/sms/createShelf.vue')
      },
      {
        path: 'shelfManage',
        name: 'shelfManage',
        component: () => import('@/views/sms/manageShelves.vue')
      },
      {
        path: 'shelf/:id',
        name: 'one shelf',
        component: () => import('@/views/sms/specificShelf.vue')
      },
    ],
    beforeEnter(to, from, next){
      if (!store.state.isLogin && to.name !== 'Login' ) next({ name: 'Login' })
      else next()
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

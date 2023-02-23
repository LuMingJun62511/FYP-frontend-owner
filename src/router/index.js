import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/layout/index.vue'
import store from '@/store/index'
// const isAuthenticated = store.state.isLogin;

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/myLogin.vue'),

  },
  // {
  //   path: '/',
  //   name: 'layout',
  //   component: Layout,
  // },
  {
    path: '/',
    name: 'Home',
    component: Layout,
    children: [{
      path: 'allInfo',
      name: 'allOrdersInfo',
      component: () => import('@/views/home/index.vue'),
      // meta: {title: '商品列表', icon: 'product-list'}
    },
    ]
  },


  {
    path: '/oms',
    name: 'omsRoot',
    component: Layout,

    redirect: '/oms/allInfo',//默认导向这里
    children: [{
        path: 'allInfo',
        name: 'allOrdersInfo',
        component: () => import('@/views/oms/orderInfo.vue'),

        // meta: {title: '商品列表', icon: 'product-list'}
      },
      {
        path: 'changeOne',
        name: 'oneOrder',
        component: () => import('@/views/oms/orderChange.vue'),
        // meta: {title: '商品列表', icon: 'product-list'}
      },
      {
        path: 'detail',
        name: 'detail',
        component: () => import('@/views/oms/order/myOrderDetail.vue'),
        // meta: {title: '商品列表', icon: 'product-list'}
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
    // redirect: '/sms/shelfManage',//默认导向这里
    children: [{
      path: 'shelfManage',
      name: 'shelfManage',
      component: () => import('@/views/sms/shelfManage.vue')
    },

    ]
  }


  //先在这里面配置好，然后在其他地方放link
  // {
  //   path: '/oms',
  //   component: Layout,
  //   redirect: '/pms/product',
  //   name: 'oms',
  //   meta: {title: '商品', icon: 'product'},
  //   children: [{
  //     path: 'product',
  //     name: 'product',
  //     component: () => import('@/views/pms/product/index'),
  //     meta: {title: '商品列表', icon: 'product-list'},
  //   },
  //     {
  //       path: 'addProduct',
  //       name: 'addProduct',
  //       component: () => import('@/views/pms/product/add'),
  //       meta: {title: '添加商品', icon: 'product-add'}
  //     },
  //     {
  //       path: 'updateProduct',
  //       name: 'updateProduct',
  //       component: () => import('@/views/pms/product/update'),
  //       meta: {title: '修改商品', icon: 'product-add'},
  //       hidden: true
  //     },
  //   ]
  // }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

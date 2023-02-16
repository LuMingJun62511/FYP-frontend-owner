import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/login/index.vue'
import Home from '@/views/home/index.vue'
import Layout from '@/views/layout/index.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    name: 'layout',
    component: Layout
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
    ]
  },
  {
    path: '/sms',
    name: 'smsRoot',
    component: Layout,
    // redirect: '/sms/shelfManage',//默认导向这里
    children: [{
      path: 'shelfManage',
      name: 'shelfManage',
      component: () => import('@/views/sms/components/testBoth.vue')
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

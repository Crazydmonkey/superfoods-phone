import Vue from 'vue'
import VueRouter from 'vue-router'
import Manager from '../pages/manager/Layout.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'manager',
    component: Manager,
    meta:{requiresAuth:true},
    children:[{
      path:"super",
      component:()=>import('../pages/manager/Super.vue')
    },{
      path:"foods",
      component:()=>import('../pages/manager/Foods.vue')
    },{
      path:"buycar",
      component:()=>import('../pages/manager/BuyCar.vue')
    },{
      path:"order",
      component:()=>import('../pages/manager/Orders.vue')
    },{
      path:"owner",
      component:()=>import('../pages/manager/Owner.vue')
    }]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../pages/register.vue')
  },
  {
    path: '/details',
    name: 'details',
    component: () => import('../pages/manager/Details.vue')
  },
  {
    path: '/collection',
    name: 'collection',
    component: () => import('../pages/manager/Collection.vue')
  },
  {
    path:'/search',
    name:'search',
    component: () =>import('../pages/manager/search.vue')
  },
  {
    path: '/searchResult',
    name: 'searchResult',
    component: () => import('../pages/manager/searchResult.vue')
  },
  {
    path:'/searchFoods',
    name:'searchFoods',
    component: () =>import('../pages/manager/searchFoods.vue')
  },
  {
    path:'/searchFoodsResult',
    name:'searchFoodsResult',
    component: () =>import('../pages/manager/searchFoodsResult.vue')
  },
  {
    path: '/our',
    name: 'our',
    component: () => import('../pages/manager/our.vue')
  },
  {
    path: '/paysetting',
    name: 'paysetting',
    component: () => import('../pages/manager/paysetting.vue')
  },
  {
    path: '/safe',
    name: 'safe',
    component: () => import('../pages/manager/safe.vue')
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('../pages/manager/setting.vue')
  },
  {
    path: '/update',
    name: 'update',
    component: () => import('../pages/manager/update.vue')
  },
  {
    path: '/updateAdres',
    name: 'updateAdres',
    component: () => import('../pages/manager/updateAdres.vue')
  },
  {
    path: '/updateGender',
    name: 'updateGender',
    component: () => import('../pages/manager/updateGender.vue')
  },
  {
    path: '/updateHead',
    name: 'updateHead',
    component: () => import('../pages/manager/updateHead.vue')
  },
  {
    path: '/updateNick',
    name: 'updateNick',
    component: () => import('../pages/manager/updateNick.vue')
  },
  {
    path: '/updatePassword',
    name: 'updatePassword',
    component: () => import('../pages/manager/updatePassword.vue')
  },
  {
    path: '/updatePhone',
    name: 'updatePhone',
    component: () => import('../pages/manager/updatePhone.vue')
  },
  {
    path :'/address',
    name: 'address',
    component: () => import('../pages/manager/address.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth){
    if(store.state.user.token){
      next();
    }else{
      next({
        path:'/login',
        query:{redirect:to.fullPath}
      })
    }
  }else{
    next();
  }
  // if(to.path === '/login' || store.state.user.userinfo){
  //   next()
  // } else {
  //   next('/login')
  // }
})
export default router

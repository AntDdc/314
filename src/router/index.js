import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/apply',
    name: 'apply',
    component: () => import('../views/apply.vue')
  },
  {
    path: '/submit',
    name: 'submit',
    component: () => import('../views/submit.vue')
  },
  {
    path: '/cards',
    name: 'cards',
    component: () => import('../views/cards.vue')
  },
  {
    path: '/modifly',
    name: 'modifly',
    component: () => import('../views/modifly.vue')
  },
  {
    path: '/assess',
    name: 'assess',
    component: () => import('../components/assess.vue')
  },
  // {
  //   path: '/assessed',
  //   name: 'assessed',
  //   component: () => import('../components/assessed.vue')
  // },
  {
    path: '/scratchGui',
    name: 'scratchGui',
    component: () => import('../components/scratchGui.vue')
  },
  {
    path: '/blank',
    name: 'blank',
    component: () => import('../components/blank.vue')
  },
  {
    path: '/revisePassword',
    name: 'revisePassword',
    component: () => import('../components/revisePassword.vue')
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

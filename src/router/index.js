import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import store from '../store'
import { _ } from 'core-js'

const childrenRoutes = [];

const manualInjectModules = ['veiculos']

const requireModules = require.context('@/views', true, /\.js$/);

requireModules.keys().forEach(fileName => {

  const folders = fileName.split('/')

  if (folders[folders.length - 1] == 'index.js' && folders[folders.length - 2] == 'router') {

    if (manualInjectModules.includes(folders[1])) {

      childrenRoutes.push(...requireModules(fileName).default)

    }
  }
})

console.log(childrenRoutes)

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'rootRoutes',
    component: Index,
    children: [
      ...childrenRoutes
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Index')
  },
  {
    path: '/check/:access_token',
    name: 'redir',
    component: Index
  },
  {
    path: '*',
    redirect: { name: '/' }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {

  if (to.path == '/') {
    const logged = JSON.parse(localStorage.getItem('logged'))
    if (logged) {
      router.push('/veiculos')
    } else {
      router.push('/login')
    }
  }
  if (to.path == '/login') {
    next()
  }
  if(to.path == '/veiculos'){
    next()
  }


  // if (to.query.page == 1 && to.query.limit == 10) {
  //   const pagination = JSON.parse(localStorage.getItem('pagination'))
  //   let redirect = {}
  //   if(to.query.page !== pagination.page){
  //     redirect = {...redirect, page:pagination.page}
  //   }
  //   if(to.query.limit !== pagination.limit){
  //     redirect = {...redirect, limit:pagination.limit}
  //   }
  //   console.log(redirect)


  // }
  // if (from.query.page && from.query.limit) {
  //   localStorage.setItem('pagination', JSON.stringify(from.query))
  // }

  // if (from.path !== '/') {

  //   const currentPath = to.fullPath

  //   localStorage.setItem('currentPath', currentPath)

  // }

  // if (to.path == '/') {

  //   router.push(process.env.VUE_APP_INDEX_PAGE)

  // }

  // if (to.name == 'login') {

  //   document.title = `${process.env.VUE_APP_APPLICATION_NAME || 'SETAR VARIAVEL APPLICATION_NAME'} | Login`

  //   next()

  // } else {

  //   if (to.params.access_token) {

  //     const refresh = to.params.access_token

  //     const application_id = process.env.VUE_APP_APPLICATION_ID

  //     const response = await store.dispatch('auth/cross_domain', { refresh, application_id })

  //     if (response) {

  //       router.push(process.env.VUE_APP_INDEX_PAGE)

  //     } else {

  //       router.push('/login')

  //     }

  //   } else if (store.state.auth.currentUser.id) {

  //     document.title = `${process.env.VUE_APP_APPLICATION_NAME || 'SETAR VARIAVEL APPLICATION_NAME'} | ${to.meta.title}`

  //     next()

  //   } else if (Cookie.get('refresh_token')) {

  //     document.title = `${process.env.VUE_APP_APPLICATION_NAME || 'SETAR VARIAVEL APPLICATION_NAME'} | ${to.meta.title}`

  //     await store.dispatch('auth/init')

  //     next()

  //   } else {

  //     router.push('login')

  //   }
  // }
})

export default router


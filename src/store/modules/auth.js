// import Cookie from "js-cookie"
// import apiCheckpoint from 'HttpCheckpoint'
// import Api from 'Http'
// import { _ } from "core-js"
// import router from '@/router'
// import { BIconCartCheck } from "bootstrap-vue"

// const state = {
//     startedYear: 2022,
//     currentUser: { responsible: "Jose from auth" },
//     loadedRoutes: false,
//     userMenu: [],
//     menuItems: [],
//     userPermissions: [],
//     burgerPermissions: {}
// }
// const getters = {}
// const actions = {
//     async init({ dispatch, commit }) {

//         const [user, permissions] = await Promise.all([

//             dispatch('get_user_data'),
//             dispatch('get_user_routes'),

//         ])

//         if (user) {

//             const existsRoutes = _.map(router.getRoutes(), (route) => {
//                 return route.path
//             })

//             _.forEach(permissions, (route) => {

//                 if (route.path) {
//                     let routeStructure = {
//                         path: route.path,
//                         name: route.name,
//                         meta: {
//                             icon: route.icon,
//                             title: route.title
//                         },
//                         component: () => import(`@/views${route.component}`)
//                     }
//                     if (!existsRoutes.includes(route.path)) {
//                         router.addRoute('rootRoutes', routeStructure)
//                     }


//                 }

//             })

//             console.log('loading')

//             commit('SET_CURRENT_USER', user.user)

//             commit('SET', { state: 'userMenu', data: user.menu })
//         }
//     },
//     async get_user_data({ }) {

//         let data = ''

//         const refreshToken = Cookie.get('refresh_token')

//         const applicationId = process.env.VUE_APP_APPLICATION_ID

//         try {

//             const response = await apiCheckpoint.post('/refresh/token', { refresh: refreshToken, application_id: applicationId })

//             if (response.status == 200 || response.status == 201) {

//                 data = response.data

//             }
//         } catch ({ response }) {

//             throw response

//         }
//         return data
//     },
//     async get_user_routes({ commit, dispatch }) {

//         const applicationId = process.env.VUE_APP_APPLICATION_ID

//         const response = await apiCheckpoint.get(`/user-menu/router/${applicationId}`)

//         let root = {

//         }

//         _.forEach(response.data.payload, (permission) => {


//             if (permission.key) {

//                 const keys = permission.key.split('.')

//                 if (keys.length > 1) {

//                     let value = [keys[keys.length - 1]]

//                     keys.pop()

//                     const obj = keys.join('.')

//                     let currentValue = ''

//                     try {

//                         currentValue = _.get(root, obj)

//                     } catch (e) {

//                         console.log('erro ao pegar valor atual', e)
//                     }


//                     if (currentValue) {


//                         value = [...value, ...currentValue]

//                     }

//                     _.set(root, obj, value)
//                 }
//             }
//         })

//         commit('SET', { state: 'userPermissions', data: response.data.payload })

//         commit('SET', { state: 'burgerPermissions', data: root })

//         return response.data.payload

//     },
//     async login({ dispatch }, data) {

//         let isLogged = false

//         try {

//             const auth = await apiCheckpoint.post('authenticate',
//                 {
//                     email: data.username,
//                     password: data.password,
//                 }
//             )

//             Cookie.set('access_token', auth.data.token)

//             Cookie.set('refresh_token', auth.data.refreshToken)

//             await dispatch('init')

//             isLogged = true

//         } catch (e) {

//             console.log(e)

//         }

//         return isLogged
//     },
//     async logout({ commit }) {

//         try {

//             Cookie.remove('access_token')

//             Cookie.remove('refresh_token')

//             commit('SET', { state: 'currentUser', data: {} })

//         } catch ({ response }) {

//             throw response

//         }
//     },
//     async cross_domain({ dispatch, commit }, refreshData) {

//         let data = ''

//         try {

//             const response = await apiCheckpoint.post('/refresh/token', refreshData)

//             if (response.status == 200 || response.status == 201) {

//                 data = response.data

//             }
//         } catch ({ response }) {
//             console.log(response)
//         }

//         if (data) {

//             Cookie.set('access_token', data.token)

//             Cookie.set('refresh_token', data.refreshToken)

//             await dispatch('init')

//             return true
//         }
//         return false
//     }
// }
// const mutations = {
//     ['SET_LOGGED']: (state, logged) => {
//         state.authenticated = logged
//     },
//     ['SET_CURRENT_USER']: (state, data) => {

//         const user = { ...state.currentUser, ...data }

//         state.currentUser = user
//     },
//     ['SET']: (state, data) => {
//         state[data.state] = data.data
//     }
// }

// export default {
//     namespaced: true,
//     state,
//     getters,
//     actions,
//     mutations
// }
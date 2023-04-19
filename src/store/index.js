import Vue from 'vue'
import Vuex from 'vuex'
import Http from 'Http'
import modules from './modules';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
 
  actions: {
    async http_post({ }, { url, data, redirect }) {


      try {
        const response = await Http().post(`${url}`, data);

        console.log(response)

        if (response.data.status == 201 || response.data.status == 200) {

          if (redirect) {

            this.state.$app.$router.push(redirect);

          }
        } 
        return response
      } catch ({ response }) {

        // this.state.$app.toastError(`Erro ao enviar ${url}`, response)
      }
    },
    async http_put({ }, { url, data, redirect }) {
      try {
        const response = await Http().put(`${url}`, data);
        console.log('response from put', response)
        if (response.data.status == 201 || response.data.status == 200) {
          this.state.$app.toastSuccess('Alteração efetuada com sucesso!')
          if (redirect) {
            this.state.$app.$router.push(redirect);
          }
        }
        if (response.data.error) {
          this.state.$app.toastError(`${url}`, response.data.error)
        }
        return response
      } catch ({ response }) {
        this.state.$app.toastError(`Erro ao enviar ${url}`, response)
      }
    },

    async http_get({ commit }, { url, vuex }) {

      try {

        const response = await Http().get(`${url}`);

        console.log('from http_get =>', { url, response })

        if (response.data.status == 201 || response.data.status == 200) {

          if (vuex) {

            const data = { state: vuex, data: response.data.payload }

            console.log('setting vuex =>', data)

            commit('SET', data)

          }
        } else if (response.data.length > 0) {
          if (vuex) {

            const data = { state: vuex, data: response.data }

            console.log('setting vuex else if =>', data)

            commit('SET', data)

          }
        } else if (response.data.id) {
          if (vuex) {

            const data = { state: vuex, data: response.data }

            console.log('setting vuex else if =>', data)

            commit('SET', data)

          }
        }

        return response

      } catch (err) {

        console.log('error from catch', err)

        this.state.$app.toastError(`Erro ao enviar ${url}`, err)

      }
    },
  },
  mutations: {
    ["SET"]: (rootState, data) => {
      const [namespace, state] = data.state.split('/')

      rootState[namespace][state] = data.data

    }
  },
  modules,
})

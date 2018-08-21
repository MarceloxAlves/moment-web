import Vue from 'vue'
import Vuex from 'vuex'

import usuario from './usuario'
import evento from './evento'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    usuario,
    evento
  }
})

export default store

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAdmin: false, // Inicialmente, o usuário não é um administrador
  },
  mutations: {
    setIsAdmin(state, isAdmin) {
      state.isAdmin = isAdmin;
    },
  },
  actions: {
    setAdminStatus({ commit }, isAdmin) {
      commit('setIsAdmin', isAdmin);
    },
  },
  getters: {
    isAdmin: (state) => state.isAdmin,
  },
});
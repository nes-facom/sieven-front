import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAdmin: false,
    passport: null, // Novo estado para armazenar o passaporte do usuário
  },
  mutations: {
    setAdminStatus(state, isAdmin) {
      state.isAdmin = isAdmin;
    },
    setPassport(state, passport) {
      state.passport = passport;
    },
  },
  actions: {
    updateAdminStatus({ commit }, isAdmin) {
      commit('setAdminStatus', isAdmin);
    },
    updatePassport({ commit }, passport) {
      commit('setPassport', passport);
    },
  },
  getters: {
    isAdmin: (state) => state.isAdmin,
    getPassport: (state) => state.passport,
  },
});
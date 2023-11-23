import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import store from '@/store'
import { VueMaskDirective } from "v-mask";

import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false


Vue.use(Vuetify)
Vue.use(VueRouter)
Vue.directive("mask", VueMaskDirective);
const vuetify = new Vuetify()

new Vue({
  el: '#app',
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app')

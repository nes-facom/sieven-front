import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import authentication from "@/plugins/keycloakPlugin"

Vue.config.productionTip = false
Vue.use(authentication)

Vue.use(Vuetify)
Vue.use(VueRouter)

const vuetify = new Vuetify()

Vue.$keycloak
  .init({ onload:'login-required', checkLoginIframe: false })
  .then(() => {
    new Vue({
      el: '#app',
      vuetify,
      router,
      render: h => h(App),
    }).$mount('#app')
})

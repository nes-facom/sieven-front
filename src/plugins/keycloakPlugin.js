import Vue from 'vue'
import Keycloak from 'keycloak-js'

const options = {
    "url": "https://homolog.ufms.br/keycloak-homolog",
    "realm": "ufms",
    "clientId": "sieven",
  };

const _keycloak = new Keycloak(options)

const Plugin = {
  install(Vue) {
    Vue.$keycloak = _keycloak
  }
}

Plugin.install = Vue => {
  Vue.$keycloak = _keycloak
  Object.defineProperties(Vue.prototype, {
    $keycloak: {
      get() {
        return _keycloak
      }
    }
  })
}

Vue.use(Plugin)

export default Plugin
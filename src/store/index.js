import VueX from 'vuex'
import Vue from "vue"

Vue.use(VueX)

const store = new VueX.Store({
    state: {
        usuario: {
            logado: false,
            papel: 'administrador',
            nome: 'Funabashi'
        }
    },
    mutations: {
        logar(state) {
            state.usuario.logado = true
        },
        deslogar(state) {
            state.usuario.logado = false
        }
    },
    actions: {
        logar({ commit }) {
            commit('logar')
        },
        deslogar({ commit }) {
            commit('deslogar')
        }
    },
    getters: {
        getLogado: state => state.usuario.logado,
        getUsuarioNome: state => state.usuario.nome,
        isEditor: state => state.usuario.papel == 'administrador' || state.usuario.papel == 'coordenador' || state.usuario.papel == 'organizador'
    }
})

export default store
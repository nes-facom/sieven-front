import router from '@/router'

export default {
    passarToken(nome, parametro) {
        localStorage.setItem(nome, JSON.stringify(parametro))
    },
    recuperarToken(nome) {
        if (localStorage.getItem(nome) == null){
            return router.push('/')
        }
        else{
            return JSON.parse(localStorage.getItem(nome))
        }
    },
    limparToken(nome) {
        localStorage.removeItem(nome);
    }
}
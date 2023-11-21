import { apiUsuario } from './utilitario.js'

const inscricaoResource =
{
    realizarInscricao(params)
    {
        return apiUsuario.post(`/inscricao/criar-inscricao`, params).then( (res) => res.data)
    },
}

export default inscricaoResource
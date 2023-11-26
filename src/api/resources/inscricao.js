import { apiUsuario } from './utilitario.js'

const inscricaoResource =
{
    realizarInscricao(params)
    {
        return apiUsuario.post(`/inscricao/criar-inscricao`, params).then( (res) => res.data)
    },
    checkin(url, token)
    {
        const headers = {
            Authorization: 'Bearer ' + token
        };

        return apiUsuario.put(url, null, { headers }).then( (res) => res.data)
    }
}


export default inscricaoResource
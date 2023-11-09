import { apiUsuario } from './utilitario.js'

const inscricaoResource =
{
    realizarInscricao(params)
    {
        return new Promise( (resolve) =>
        {
            apiUsuario.post(`/inscricao/criar-inscricao`, params).then( (res) =>
            {
                resolve(res.data)
            }).catch( () =>
            {

            })
        })
    },
}

export default inscricaoResource
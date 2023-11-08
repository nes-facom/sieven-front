import { apiUsuario } from './utilitario.js'

const inscricaoResource =
{
    realizarInscricao()
    {
        return new Promise( (resolve) =>
        {
            apiUsuario.post(`/inscricao/criar-inscricao`).then( (res) =>
            {
                resolve(res.data)
            }).catch( () =>
            {

            })
        })
    },
}

export default inscricaoResource
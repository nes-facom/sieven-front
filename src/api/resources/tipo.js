import { apiUsuario } from './utilitario.js'

const tipoResource =
{
    listarTipos()
    {
        return new Promise( (resolve) =>
        {
            apiUsuario.get(`/tipo`).then( (res) =>
            {
                resolve(res.data)
            }).catch( () =>
            {

            })
        })
    },
}

export default tipoResource
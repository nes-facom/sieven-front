import { apiUsuario } from './utilitario.js'

const tipoResource =
{
    verificarAdmin(nome)
    {
        return new Promise( (resolve) =>
        {
            apiUsuario.get(`/verificar-nome/${nome}`, nome).then( (res) =>
            {
                resolve(res.data)
            }).catch( () =>
            {

            })
        })
    },
}

export default tipoResource
import { apiUsuario } from './utilitario.js'

const modalidadeResource =
{
    listarModalidades()
    {
        return new Promise( (resolve) =>
        {
            apiUsuario.get(`/modalidade`).then( (res) =>
            {
                resolve(res.data)
            }).catch( () =>
            {

            })
        })
    },
}

export default modalidadeResource
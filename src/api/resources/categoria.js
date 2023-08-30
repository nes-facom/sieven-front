import { apiUsuario } from './utilitario.js'

const categoriaResource =
{
    listarCategorias()
    {
        return new Promise( (resolve) =>
        {
            apiUsuario.get('/categoria').then( (res) =>
            {
                resolve(res.data)
            }).catch( () =>
            {

            })
        })
    },
}

export default categoriaResource
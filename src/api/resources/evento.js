import { apiUsuario } from './utilitario.js'

const eventoResource =
{
    cadastrarEvento(params)
    {
        return new Promise( (resolve) =>
        {
            apiUsuario.post(`/evento/criar-evento`, params).then( (res) =>
            {
                resolve(res.data)
            }).catch( () =>
            {

            })
        })
    },

    listarEventos()
    {
        return new Promise( (resolve) =>
        {
            apiUsuario.get(`/evento`, ).then( (res) =>
            {
                resolve(res.data)
            }).catch( () =>
            {

            })
        })
    },

    visualizarEventos(eventoId){
        return new Promise( (resolve) =>
        {
            apiUsuario.get(`/evento/${eventoId}`).then( (res) =>
            {
                resolve(res.data)
            }).catch( () =>
            {

            })
        })
    }

}



export default eventoResource
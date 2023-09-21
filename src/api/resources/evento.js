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
    },

    editarEventos(eventoId){
        return new Promise( (resolve, reject) =>
        {
            const successResponse = { message: 'Event updated successfully' };
            apiUsuario.put(`/evento/${eventoId}`).then( (res) =>
            {
                console.log(res)
                resolve(successResponse)
            }).catch( (error) =>
            {   
                reject(error)
            })
        })
    }

}



export default eventoResource
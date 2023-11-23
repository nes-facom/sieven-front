import { apiUsuario } from './utilitario.js'

const eventoResource =
{
    cadastrarEvento(token, params)
    {
        const headers = {
            Authorization: 'Bearer ' + token
        };

        return new Promise( (resolve) =>
        {
            apiUsuario.post(`/evento/criar-evento`, params, { headers }).then( (res) =>
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

    listarEventosPaginaInicial()
    {
        return new Promise( (resolve) =>
        {
            apiUsuario.get(`/eventos-pagina-inicial`, ).then( (res) =>
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
            //console.log(eventoId)
            apiUsuario.get(`/evento/${eventoId}`).then( (res) =>
            {
                resolve(res.data)
            }).catch( () =>
            {

            })
        })
    },

    editarEventos(token, eventoId , eventoData){
        return new Promise( (resolve, reject) =>
        {
            const headers = {
                Authorization: 'Bearer ' + token
            };

            apiUsuario.put(`/evento/${eventoId}` , eventoData, { headers }).then((res) =>
            {   
                resolve(res)
            }).catch( (error) =>
            {   
                reject(error)
            })
        })
    },

    deletarEventos(token, eventoId) {
        return new Promise((resolve, reject) => {

            const headers = {
                Authorization: 'Bearer ' + token
            };

            apiUsuario.delete(`/evento/${eventoId}`, { headers })
                .then((res) => {
                resolve(res);
                })
                .catch((error) => {
                reject(error);
                });
        });
      }
}



export default eventoResource
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

    editarEventos(eventoId , eventoData){
        return new Promise( (resolve, reject) =>
        {
            apiUsuario.put(`/evento/${eventoId}` , eventoData).then((res) =>
            {   
                resolve(res)
            }).catch( (error) =>
            {   
                reject(error)
            })
        })
    },

    deletarEventos(eventoId) {
        return new Promise((resolve, reject) => {
          apiUsuario.delete(`/evento/${eventoId}`)
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
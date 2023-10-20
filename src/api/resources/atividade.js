import { apiUsuario } from './utilitario.js'

const atividadeResource =
{
    cadastrarAtividade(params)
    {
        return new Promise( (resolve) =>
        {
            apiUsuario.post(`/atividade/criar-atividade`, params).then( (res) =>
            {
                resolve(res.data)
            }).catch( () =>
            {

            })
        })
    },

    listarAtividades(eventoId)
    {
        return new Promise( (resolve) =>
        {
            apiUsuario.get(`/atividade/${eventoId}`).then( (res) =>
            {
                resolve(res.data)
            }).catch( () =>
            {

            })
        })
    },

    visualizarAtividades(atividadeId){
        return new Promise( (resolve) =>
        {
            apiUsuario.get(`/atividade/${atividadeId}`).then( (res) =>
            {
                resolve(res.data)
            }).catch( () =>
            {

            })
        })
    },

    editarAtividades(atividadeId , atividadeData){
        return new Promise( (resolve, reject) =>
        {
            apiUsuario.put(`/atividade/${atividadeId}` , atividadeData).then((res) =>
            {   
                resolve(res)
            }).catch( (error) =>
            {   
                reject(error)
            })
        })
    },

    deletarAtividade(atividadeId) {
        return new Promise((resolve, reject) => {
          apiUsuario.delete(`/atividade/${atividadeId}`)
            .then((res) => {
              resolve(res);
            })
            .catch((error) => {
              reject(error);
            });
        });
      }
}



export default atividadeResource
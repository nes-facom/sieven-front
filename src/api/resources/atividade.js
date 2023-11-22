import { apiUsuario } from './utilitario.js'

const atividadeResource =
{
    cadastrarAtividade(token, params)
    {
        const headers = {
            Authorization: 'Bearer ' + token
        };

        return new Promise( (resolve) =>
        {
            apiUsuario.post(`/atividade/criar-atividade`, params, { headers }).then( (res) =>
            {
                resolve(res.data)
            }).catch( () =>
            {

            })
        })
    },

    listarAtividades(eventoId)
    {
        console.log(eventoId)
        return new Promise( (resolve) =>
        {
            apiUsuario.get(`/evento/${eventoId}/detalhes`).then( (res) =>
            {
                resolve(res.data)
            }).catch( () =>
            {

            })
        })
    },

    listarAtividadesCheckin(token)
    {
        const headers = {
            Authorization: 'Bearer ' + token
        };
        return new Promise( (resolve) =>
        {
            apiUsuario.get(`/atividade`, { headers }).then( (res) =>
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

    editarAtividades(token, atividadeId , atividadeData){
        return new Promise( (resolve, reject) =>
        {
            const headers = {
                Authorization: 'Bearer ' + token
            };

            apiUsuario.put(`/atividade/${atividadeId}` , atividadeData, { headers }).then((res) =>
            {   
                resolve(res)
            }).catch( (error) =>
            {   
                reject(error)
            })
        })
    },

    deletarAtividade(token, atividadeId) {
        return new Promise((resolve, reject) => {
            const headers = {
                Authorization: 'Bearer ' + token
            };
          apiUsuario.delete(`/atividade/${atividadeId}`, { headers })
            .then((res) => {
              resolve(res);
            })
            .catch((error) => {
              reject(error);
            });
        });
      },
      gerarRelatorio(token, atividadeId) {
        return new Promise((resolve, reject) => {
          const headers = {
            Authorization: 'Bearer ' + token,
          };
    
          apiUsuario.get(`/atividade/${atividadeId}/gerar-relatorio`, { headers, responseType: 'blob' })
            .then((res) => {
              resolve(res);
            })
            .catch((error) => {
              reject(error);
            });
        });
      },
}



export default atividadeResource
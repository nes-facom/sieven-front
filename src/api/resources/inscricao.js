import { apiUsuario } from './utilitario.js'

const inscricaoResource =
{
    checkin(url, token)
    {
        const headers = {
            Authorization: 'Bearer ' + token
        };

        return new Promise( (resolve, reject) =>
        {
            apiUsuario.put(url, null, { headers }).then( (res) =>
            {
                resolve(res.data)
                
            }).catch(err =>
            {
                if(err.response.status === 401) 
                {
                    reject(err)
                }
            })
        })
    }
}

export default inscricaoResource
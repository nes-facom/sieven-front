import { apiUsuario } from './utilitario.js'

const loginResource =
{
    login(params)
    {
        return new Promise( (resolve, reject) =>
        {
            apiUsuario.post('/auth/login', params).then( (res) =>
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

export default loginResource
import { apiUsuario } from './utilitario.js'

const inscricaoResource =
{
    checkin(url, token)
    {
        const headers = {
            Authorization: 'Bearer ' + token
        };

        return apiUsuario.put(url, null, { headers }).then( (res) => res.data)
    }
}

export default inscricaoResource
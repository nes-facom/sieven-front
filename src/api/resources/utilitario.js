import { apiSieven } from '../api.js'
import router from '@/router'

const apiUsuario =
{
    get(url, query)
    {
        return apiSieven.get(url, query).catch(err => {
            if (err.response.status == 401) {
                router.push('/')
            }
        })
    },
    post(url, parameters, config)
    {
        return apiSieven.post(url, parameters, config).catch(err => {
            if (err.response.status == 401) {
                router.push('/')
            }
        })
    },
    put(url, parameters, config)
    {
        return apiSieven.put(url, parameters, config).catch(err => {
            if (err.response.status == 401) {
                router.push('/')
            }
            throw err
        })
    },
    patch(url, parameters, config)
    {
        return apiSieven.patch(url, parameters, config).catch(err => {
            if (err.response.status == 401) {
                router.push('/')
            }
        })
    },
    delete(url, parameters)
    {
        return apiSieven.delete(url, parameters).catch(err => {
            if (err.response.status == 401) {
                router.push('/')
            }
        })
    }
}

export { apiUsuario }
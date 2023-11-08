import axios from 'axios'

const apiSieven = axios.create({
    baseURL: 'https://52.206.163.83/api'   ,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

export { apiSieven }
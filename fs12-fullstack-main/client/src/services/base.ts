import axios from 'axios'

export const axiosBookInstance = axios.create({
    baseURL: 'http://localhost:3001/api/v1/books'
})

export const axiosAuthorsInstance = axios.create({
    baseURL: 'http://localhost:3001/api/v1/authors'
})

export const axiosAuthInstance = axios.create({
    baseURL: 'http://localhost:3001/api/v1/auth'
})


import { Author, AuthorQuery } from "types"
import { axiosAuthorsInstance } from "./base"

const getAll = async () => {
    const response = await axiosAuthorsInstance.get('/')
    return response.data
}

const addAuthor = async (author: Partial<Author>) => {
    const token = window.localStorage.getItem('libmaUserToken')
    const response = await axiosAuthorsInstance.post('/', author, {
        headers : {
            Authorization : `Bearer ${token}`,
            'Content-Type' : 'application/json'
        }
    })
    return response.data
}

const editAuthor = async (id : string, update: Partial<AuthorQuery>) => {
    const token = window.localStorage.getItem('libmaUserToken')
    console.log('Current Token: ', token)
    const response = await axiosAuthorsInstance.put(`/id/${id}`, update, {
        headers : {
            Authorization : `Bearer ${token}`,
            'Content-Type' : 'application/json'
        }
    })
    return response.data
}

const deleteAuthor = async (id: string) => {
    const token = window.localStorage.getItem('libmaUserToken')
    await axiosAuthorsInstance.delete(`/id/${id}`, {
        headers : {
            Authorization : `Bearer ${token}`,
            'Content-Type' : 'application/json'
        }
    })
}

const methods = { getAll, addAuthor, editAuthor, deleteAuthor }
export default methods
import { Book, Query } from "types"
import { axiosBookInstance } from "./base"

const getAll = async () => {
    const response = await axiosBookInstance.get('/')
    return response.data
}

const addBook = async (newBook : Partial<Book>) => {
    const token = window.localStorage.getItem('libmaUserToken')
    const response = await axiosBookInstance.post('/', newBook, {
        headers : {
            Authorization : `Bearer ${token}`,
            'Content-Type' : 'application/json'
        }
    })
    return response.data
}

const filterBook = async (query : Partial<Query>) => {
    let link = []
    if(query.authors) link.push(`authors=${query.authors}`)
    if(query.categories) link.push(`categories=${query.categories}`)
    if(query.status) link.push(`status=${query.status}`)
    if(query.title) link.push(`title=${query.title}`)
    console.log(`/filter?${link.join('&')}`)
    const response = await axiosBookInstance.get(`/filter?${link.join('&')}`)
    return response.data
}

const findByISBN = async (ISBN : string) => {
    const response = await axiosBookInstance.get(`/isbn/${ISBN}`)
    return response.data
}

const updateDescription = async ({id, description} : {id: string, description: string}) => {
    const token = window.localStorage.getItem('libmaUserToken')
    const response = await axiosBookInstance.put(`/${id}/update/description`, { description }, {
        headers : {
            Authorization : `Bearer ${token}`,
            'Content-Type' : 'application/json'
        }
    })
    return response.data
}

const addAuthors = async (id : string, update : {names : string[]}) => {
    const token = window.localStorage.getItem('libmaUserToken')
    const response = await axiosBookInstance.put(`/${id}/update/authors`, update, {
        headers : {
            Authorization : `Bearer ${token}`,
            'Content-Type' : 'application/json'
        }
    })
    return response.data
}

const deleteBook = async ( id: string) => {
    const token = window.localStorage.get('libmaUserToken')
    await axiosBookInstance.delete(`/${id}`, {
        headers : {
            Authorization : `Bearer ${token}`,
            'Content-Type' : 'application/json'
        }
    })
}

const borrowBook = async (id : string) => {
    const token = window.localStorage.getItem('libmaUserToken')
    const response  = await axiosBookInstance.put(`/${id}/borrow`, {}, {
        headers : {
            Authorization : `Bearer ${token}`,
            'Content-Type' : 'application/json'
        }
    })
    return response.data
}

const returnBook = async (id : string) => {
    const token = window.localStorage.getItem('libmaUserToken')
    const response  = await axiosBookInstance.put(`/${id}/return`, {}, {
        headers : {
            Authorization : `Bearer ${token}`,
            'Content-Type' : 'application/json'
        }
    })
    return response.data
}

const methods = { getAll, addBook, findByISBN, filterBook, updateDescription, addAuthors, deleteBook, borrowBook, returnBook }

export default methods
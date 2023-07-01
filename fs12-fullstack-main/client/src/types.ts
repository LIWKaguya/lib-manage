type Status = 'available' | 'borrowed'

export type Book = {
    _id: string
    title: string
    ISBN: string
    description: string
    publisher: string
    status: Status
    borrowedId: Partial<User>
    authors: Partial<Author>[]
    categories: string[]
    publishedYear: number
    borrowedDate: string[]
    returnedDate: string[]
}

export type User = {
    _id: string
    username: string
    firstName: string
    lastName: string
    email: string
    isAdmin: boolean
    borrowedBooks: Partial<Book>[]
}

export type Author = {
    _id: string
    name: string
    books: Partial<Book>[]
    yearOfBirth: number
    description: string
}

export type Query = {
    title : string
    categories: string
    authors: string
    status: Status
    ISBN: string
}

export type AuthorQuery = {
    description: string
    yearOfBirth: number
}
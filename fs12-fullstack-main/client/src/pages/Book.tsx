import { Button, Center, Text } from "@chakra-ui/react"
import BookDeleteAlert from "components/Book/BookDeleteAlert"
import EditBookModal from "components/Book/EditBookModal"
import NotFound from "components/not_found/NotFound"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import { getAllBooks, setBooks } from "redux/slices/books.slice"
import booksService from '../services/books.service'

const Book = () => {
    const { id }= useParams()
    const dispatch = useAppDispatch()
    const { books, user } = useAppSelector(state => state)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAllBooks())
    }, [dispatch])

    if(!id) return <NotFound />

    const book = books.find(b => b._id === id) 

    if(!book) return <NotFound />

    const handleBorrowBook = async (id: string) => {
        setLoading(true)
        const result = await booksService.borrowBook(id)
        dispatch(setBooks(books.map(book => book._id === result._id ? result : book)))
        navigate('/books')
        setLoading(false)
    }

    const handleReturnBook = async (id: string) => {
        setLoading(true)
        const result = await booksService.returnBook(id)
        dispatch(setBooks(books.map(book => book._id === result._id ? result : book)))
        navigate('/books')
        setLoading(false)
    }

    const goBack = () => {
        navigate(-1)
  }

    return (
        <Center flexDir='column'>
            <Text fontSize='xl'>{book.title}</Text>
            <Text fontSize='md'>ISBN : {book.ISBN}</Text>
            <Text fontSize='md'>Description : {book.description}</Text>
            <Text fontSize='md'>Authors: {book.authors.length === 0 ? 'To Be Updated' : book.authors.map(a => a.name).join(', ')}</Text>
            <Text fontSize='md'>Publisher: {book.publisher}</Text>
            <Text fontSize='md'>Categories: {book.categories.join(', ')}</Text>
            <Text fontSize='md'>Published year: {book.publishedYear}</Text>
            { user.isAdmin && <EditBookModal />}
            { user.isAdmin && <BookDeleteAlert />}
            { book.borrowedId === null && 
            <Button m={5} colorScheme='yellow' onClick={() => handleBorrowBook(id)} isLoading={loading}>
                Borrow
            </Button>}
            {book.borrowedId?._id === user._id && 
            <Button m={5} colorScheme='green' onClick={() => handleReturnBook(id)} isLoading={loading}>
                Return              
            </Button>}
            <Button onClick={goBack} m={5}>Back</Button>
        </Center>
    )
}

export default Book
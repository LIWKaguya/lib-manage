import { Button, Center, FormControl, FormErrorMessage, FormHelperText, FormLabel, Textarea } from "@chakra-ui/react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import { setBooks } from "redux/slices/books.slice"

import booksService from '../../services/books.service'
import NotFound from "../not_found/NotFound"

const EditBookModalOne = ({ onClose } : { onClose : () => void}) => {
    const { id } = useParams()
    const [description, setDescription] = useState('')
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false)
    const books = useAppSelector(state => state.books)

    if(!id) return <NotFound />

    const isError = description === ''

    const handleUpdateDescription = async (event : React.FormEvent<HTMLElement>) => {
        event.preventDefault()
        if(!isError) {
        setLoading(true)
        const result = await booksService.updateDescription({id, description})
        setDescription('')
        dispatch(setBooks(books.map(b => b._id === result._id ? result : b)))
        onClose()
        setLoading(false)
        }
    }

    return (
        <form onSubmit={handleUpdateDescription}>
            <FormControl isInvalid={isError}>
                <FormLabel>Description</FormLabel>
                <Textarea value={description} onChange={(e) => setDescription(e.currentTarget.value)}/>
                {isError ? <FormErrorMessage>Description can't be empty</FormErrorMessage> : <FormHelperText>Description of the book</FormHelperText> }
            </FormControl>
            <Center>
                <Button type='submit' m={5} isLoading={loading}>Edit</Button>
            </Center>
        </form>
    )
}

export default EditBookModalOne
import { Box, Button, Center, FormControl, FormErrorMessage, FormHelperText, FormLabel, Tag, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import booksService from '../../services/books.service'
import { getAllAuthors } from "redux/slices/authors.slice"
import NotFound from "../not_found/NotFound"
import { setBooks } from "redux/slices/books.slice"
import { Author } from "types"

const EditBookModalTwo = ({ onClose } : { onClose : () => void}) => {
    const {authors, books}  = useAppSelector(state => state) 
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false)
    const { id } = useParams()

    useEffect(() => {
        dispatch(getAllAuthors())
    }, [dispatch])

    const [ authorsStack, setAuthorsStack ] = useState<(Author[])>([])

    if(!id) return < NotFound />

    const book = books.find(b => b._id === id)

    if(!book) return <NotFound />

    const isError = authorsStack.length === 0


    const addToAuthorsStack = (author: Author) => {
        setAuthorsStack([...authorsStack, author])
    }

    const removeAuthorFromStack = (author: Author) => {
        setAuthorsStack(authorsStack.filter(a => a._id !== author._id))
    }

    const handleBookAuthors = async (event : React.FormEvent<HTMLElement>) => {
        event.preventDefault()
        if(!isError) {
            setLoading(true)
            const update = {
                names : [...authorsStack.map(a => a.name)]
            }
            const result = await booksService.addAuthors(id, update)
            dispatch(setBooks(books.map(b => b._id === result._id ? result: b)))
            onClose()
            setLoading(false)
        }
    }

    console.log(book.authors.map(a => a.name))

    return (
        <form onSubmit={handleBookAuthors}>
            <FormControl isInvalid={isError}>
            <FormLabel>Authors</FormLabel>
                            <Box border='1px' borderColor='purple' p='5px'>
                            <Text>Current choices:</Text>
                                {authorsStack.length === 0 && <Text color='red'>No choice currently</Text>}
                                {
                                    authorsStack.map(author => (
                                        <Tag as={Button} size='md' onClick={() => removeAuthorFromStack(author)} key={author._id} colorScheme='purple' m="5px">
                                            {author.name}
                                        </Tag>
                                    ))
                                }
                            </Box>
                            <Box border='1px' borderColor='cyan' p='5px'>
                                <Text>Lists:</Text>
                                {authors.map(author => (
                                    <Tag as={Button} size='md' key={author._id} colorScheme='cyan' m="5px" onClick={() => addToAuthorsStack(author)} isDisabled={authorsStack.map(a => a.name).includes(author.name) || book.authors.map(a => a.name).includes(author.name)}>
                                        {author.name}
                                    </Tag>
                                ))}
                            </Box>
            {isError ? <FormErrorMessage>The stack can't be empty</FormErrorMessage> : <FormHelperText>The authors added for the book</FormHelperText>}
            </FormControl>
            <Center>
                <Button type='submit' m={5} isLoading={loading}>Edit</Button>
            </Center>
        </form>
    )
}

export default EditBookModalTwo
import { Button, Center, FormControl, FormHelperText, FormLabel, Input } from "@chakra-ui/react"
import { useState } from "react"
import { useAppDispatch, useNavigateSearch } from "redux/hooks"
import { setBooks } from "redux/slices/books.slice"

import booksService from '../../services/books.service'

const SearchPopoverPageTwo = () => {
    const [ISBN, setISBN] = useState('')
    const dispatch = useAppDispatch()
    const navigateSearch = useNavigateSearch()
    const [loading, setLoading] = useState(false)

    const handleISBNSearch = async (event : React.FormEvent<HTMLElement>) => {
        event.preventDefault()
        setLoading(true)
        const result = await booksService.findByISBN(ISBN)
        dispatch(setBooks([result]))
        navigateSearch('/books/filter', { ISBN })
        setLoading(false)
    }

    return (
        <form onSubmit={handleISBNSearch}>
            <FormControl mt={3} mb={3}>
                <FormLabel>ISBN</FormLabel>
                <Input value={ISBN} onChange={(e) => setISBN(e.target.value)}/>
                <FormHelperText>ISBN of the book</FormHelperText>
            </FormControl>
            <Center mt={3} mb={3}>
                <Button type='submit' isLoading={loading}>Search</Button>
            </Center>
        </form>
    )
}

export default SearchPopoverPageTwo
import { Center, Text, Grid, GridItem } from "@chakra-ui/react"
import BookAddForm from "components/Books/BookAddForm"
import BookCard from "components/Books/BookCard"
import SearchModal from "components/Books/SearchModal"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import { getAllBooks } from "redux/slices/books.slice"

const Books = () => {
    const user = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const books = useAppSelector(state => state.books)

    useEffect(() => {
        dispatch(getAllBooks())
    }, [dispatch])    

    return (
        <Center flexDir='column'>
            <Text fontSize='6xl'>Books</Text>
            { user.isAdmin &&  <BookAddForm /> }
            <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                {books.map(b => {
                    return (
                        <GridItem key={b._id}>
                            <BookCard book={b} />
                        </GridItem>
                    )
                })}
            </Grid>
            <SearchModal />
        </Center>
    )    
}

export default Books
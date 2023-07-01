import { Center, Text, Button, Grid, GridItem } from "@chakra-ui/react"
import BookCard from "components/Books/BookCard"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "redux/hooks"

const FilterResult = () => {
    const { books } = useAppSelector(state => state)
    const navigate = useNavigate()

    const goBack = () => {
        navigate(-1)
    }

    return (
        <>    
            <Center flexDir='column'>
                <Text fontSize='6xl'>Result</Text>
                <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                {books.map(b => {
                    return (
                        <GridItem key={b._id}>
                            <BookCard book={b} />
                        </GridItem>
                    )
                })}
                </Grid>
                <Button onClick={goBack}>Go Back</Button>
            </Center>
        </>
    )
}

export default FilterResult
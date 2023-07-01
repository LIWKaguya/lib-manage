import { Center, Text, Grid, GridItem } from "@chakra-ui/react"
import AuthorAddForm from "components/Authors/AuthorAddForm"
import AuthorCard from "components/Authors/AuthorCard"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import { getAllAuthors } from "redux/slices/authors.slice"

const Authors = () => {
    const dispatch = useAppDispatch()
    const { authors, user }= useAppSelector(state => state) 

    useEffect(() => {
        dispatch(getAllAuthors())
    }, [dispatch])

    return (
        <Center flexDir='column'>
            <Text fontSize='6xl'>Authors</Text>
            {user.isAdmin && <AuthorAddForm />}
            <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                {authors.map(a => {
                    return (
                        <GridItem key={a._id}>
                            <AuthorCard author={a} />
                        </GridItem>
                    )
                })}
            </Grid>    
        </Center>
    )    
}

export default Authors
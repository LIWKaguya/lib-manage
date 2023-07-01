import { Button, Center } from "@chakra-ui/react"
import NotFound from "components/not_found/NotFound"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Text } from "@chakra-ui/react"

import { useAppDispatch, useAppSelector } from "redux/hooks"
import { getAllAuthors } from "redux/slices/authors.slice"
import EditAuthorModal from "components/Author/EditAuthorModal"
import AuthorDeleteAlert from "components/Author/AuthorDeleteAlert"

const Author = () => {
    const { id }= useParams()
    const dispatch = useAppDispatch()
    const { authors, user } = useAppSelector(state => state)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAllAuthors())
    }, [dispatch])

    if(!id) return <NotFound />

    const author = authors.find(b => b._id === id) 

    if(!author) return <NotFound />

    const goBack = () => {
        navigate(-1)
  }

    return (
        <Center flexDir='column'>
            <Text fontSize='xl'>{author.name}</Text>
            <Text fontSize='md'>Year of Birth : {author.yearOfBirth}</Text>
            <Text fontSize='md'>Description : {author.description}</Text>
            <Text fontSize='md'>Books: {author.books.length === 0 ? 'To Be Updated' : author.books.map(a => a.title).join(', ')}</Text>
            { user.isAdmin && <EditAuthorModal />}
            { user.isAdmin && <AuthorDeleteAlert />}
            <Button onClick={goBack} m={5}>Back</Button>
        </Center>
    )
}

export default Author
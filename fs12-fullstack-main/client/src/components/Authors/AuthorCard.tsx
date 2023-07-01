import { Link as ReachLink } from "react-router-dom"
import { Text, Divider, Center, Box } from "@chakra-ui/react"
import { Author } from "types"

const AuthorCard = ({ author } : { author : Author}) => {
    return (
        <Box m={3}>
        <Text as={ReachLink} fontSize='xl' to={`/authors/${author._id}`} m='10px'>{author.name}</Text>
        <Text fontSize='md' m='10px'>{author.description}</Text>
        <Divider />
        <Center flexDir='column'>
        <Text m='10px'>
            {author.books.length ? `${author.books.map(b => b.title).splice(0, Math.min(2, author.books.length)).join(', ')}, etc.` : 'To be updated...'}
        </Text>
        </Center>
        <Divider />
        <Text m={10}>
            Year of birth : {author.yearOfBirth}
        </Text>
        </Box>
    )
}

export default AuthorCard
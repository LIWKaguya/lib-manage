import { Box, Center, Divider, Tag, Text } from "@chakra-ui/react"
import { Link as ReachLink } from "react-router-dom"
import { Book } from "types"

const BookCard = ({ book } : { book : Book}) => {
    return (
        <Box m={3}>
        <Text as={ReachLink} fontSize='xl' to={`/books/${book._id}`} m='10px'>{book.title}</Text>
        <Text fontSize='md' m='10px'>{book.description}</Text>
        <Divider />
        <Center flexDir='column'>
        <Text m='10px'>
            {book.authors.length === 0 ? 'To Be Updated...' : book.authors.map(a => a.name).join(',')}
        </Text>
        </Center>
        <Divider />
        {book.categories.map(c => {
            return (
                <Tag colorScheme='orange' key={c} m='10px'>{c}</Tag>
            )
        }
        )}
        <Divider />
        <Tag m='10px' colorScheme={book.status === 'available' ? 'green' : 'red'}>{book.status}</Tag>
        </Box>
    )
}

export default BookCard
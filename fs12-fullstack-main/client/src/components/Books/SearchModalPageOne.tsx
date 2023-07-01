import { Box, Button, FormControl, FormHelperText, FormLabel, Input, Text, Tag, Center, HStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"


import { useAppDispatch, useAppSelector, useNavigateSearch } from "redux/hooks"
import { categories } from "data/categories"
import { getAllAuthors } from "redux/slices/authors.slice"
import { Author, Query } from "types"
import bookServices from '../../services/books.service'
import { setBooks } from "redux/slices/books.slice"


const SearchPopoverPageOne = () => {
    const [disable, setDisable] = useState(false)
    const [title, setTitle] = useState('')
    const [status, setStatus] = useState(true)
    const [authorsStack, setAuthorsStack] = useState<Author[]>([])
    const [categoriesStack, setCategoriesStack] = useState<string[]>([])
    const [loading, setLoading] = useState(false)

    const { authors } = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const navigateSearch = useNavigateSearch()

    useEffect(() => {
        dispatch(getAllAuthors())
    }, [dispatch])
 
    const addToAuthorsStack = (author : Author) => {
        setAuthorsStack([...authorsStack, author])
    }

    const removeFromAuthorsStack = (author: Author) => {
        setAuthorsStack(authorsStack.filter(a => a._id !== author._id))
    }

    const addToCategoriesStack = ( category : string) => {
        setCategoriesStack([...categoriesStack, category])
    } 

    const removeFromCategoriesStack = ( category : string ) => {
        setCategoriesStack(categoriesStack.filter(c => c !== category))
    } 

    const handleFilterSearch = async (event : React.FormEvent<HTMLElement>) => {
        event.preventDefault()
        let query : Partial<Query> = {}
        if(title) query['title'] = title
        if(!disable) query['status'] = status ? 'available' : 'borrowed'
        if(categoriesStack.length) query['categories'] = categoriesStack.join(',')
        if(authorsStack.length) query['authors'] = authorsStack.map(a => a._id).join(',')
        const result = await bookServices.filterBook(query)
        setLoading(true)
        setDisable(false)
        setTitle('')
        setStatus(true)
        setAuthorsStack([])
        setCategoriesStack([])
        dispatch(setBooks(result))
        navigateSearch('/books/filter', query)
        setLoading(false)
    }


    return (
        <>
        <form onSubmit={handleFilterSearch}>
            <FormControl mt={3} mb={3}>
                <FormLabel>Title</FormLabel>
                <Input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
                <FormHelperText>The title you need</FormHelperText>
            </FormControl>
            <FormControl mt={3} mb={3}>
                <FormLabel>Status</FormLabel>
                <HStack spacing={4}>
                <Button onClick={() => setStatus(!status)} colorScheme={status ? 'green' : 'red'} isDisabled={disable}>
                    {status ? 'Available' : 'Borrowed'}
                </Button>
                <Button onClick={() => setDisable(!disable)} colorScheme={disable ? 'green' : 'red'}>
                    Both
                </Button>
                </HStack>
                <FormHelperText>The status of the book</FormHelperText>
            </FormControl>
            <FormControl mt={3} mb={3}>
                        <FormLabel>Authors</FormLabel>
                            <Box border='1px' borderColor='purple' p='5px'>
                            <Text>Current choices:</Text>
                                {authorsStack.length === 0 && <Text color='red'>No choice currently</Text>}
                                {
                                    authorsStack.map(author => (
                                        <Tag as={Button} size='md' key={author._id} colorScheme='purple' m="5px" onClick={() => removeFromAuthorsStack(author)}>
                                            {author.name}
                                        </Tag>
                                    ))
                                }
                            </Box>
                            <Box border='1px' borderColor='cyan' p='5px'>
                                <Text>Lists:</Text>
                                {authors.map(author => (
                                    <Tag as={Button} size='md' key={author.name} colorScheme='cyan' m="5px" onClick={() => addToAuthorsStack(author)} isDisabled={authorsStack.map(a => a.name).includes(author.name)}>
                                        {author.name}
                                    </Tag>
                                ))}
                            </Box>
            </FormControl>
            <FormControl mt={3} mb={3}>
            <FormLabel>Categories</FormLabel>
                            <Box border='1px' borderColor='purple' p='5px'>
                            <Text>Current choices:</Text>
                                {categoriesStack.length === 0 && <Text color='red'>No choice currently</Text>}
                                {
                                    categoriesStack.map(category => (
                                        <Tag as={Button} size='md' key={category} colorScheme='purple' m="5px" onClick={() => removeFromCategoriesStack(category)}>
                                            {category}
                                        </Tag>
                                    ))
                                }
                            </Box>
                            <Box border='1px' borderColor='cyan' p='5px'>
                                <Text>Lists:</Text>
                                {categories.map(category => (
                                    <Tag as={Button} size='md' key={category} colorScheme='cyan' m="5px" onClick={() => addToCategoriesStack(category)} isDisabled={categoriesStack.includes(category)}>
                                        {category}
                                    </Tag>
                                ))}
                            </Box>
            </FormControl>
            <Center mt={3} mb={3}>
                <Button type='submit' colorScheme='pink' isLoading={loading} m={5}>Search</Button>
            </Center>
        </form>
        </>
    )
}

export default SearchPopoverPageOne
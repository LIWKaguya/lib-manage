import { Button, FormControl, FormHelperText, FormLabel, Text, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure, Tag, Box, Center, FormErrorMessage } from "@chakra-ui/react"
import React, { useState } from "react"

import { useAppDispatch, useAppSelector } from "redux/hooks"
import { categories } from "data/categories"
import { addToStack, removeFromStack, setStack } from "redux/slices/stack.slice"
import { addNewBook } from "redux/slices/books.slice"
import booksService from '../../services/books.service'


const BookAddForm = () => {
    const [title, setTitle] = useState('')
    const [ISBN, setISBN] = useState('')
    const [description, setDescription] = useState('')
    const [publisher, setPublisher] = useState('')
    const [publishedYear, setPublishedYear] = useState('')
    const [loading, setLoading] = useState(false)


    const stack = useAppSelector(state => state.stack)
    const dispatch = useAppDispatch()

    const {isOpen, onOpen, onClose} = useDisclosure()

    const addCategoryToStack = (category : string) => {
        dispatch(addToStack(category))
    }

    const removeCategoryFromStack = (category : string) => {
        dispatch(removeFromStack(category))
    }

    const titleError = title === ''
    const ISBNError = ISBN === ''
    const descriptionError = description === ''
    const publisherError = publisher === ''
    const publishedYearError = parseInt(publishedYear, 10) < 0 || parseInt(publishedYear, 10) > 2022 || publishedYear === ''
    const categoriesError = stack.length === 0
    const check = titleError || ISBNError || descriptionError || publisherError || publishedYearError || categoriesError 

    const handleAddBook = async (event : React.FormEvent<HTMLElement>) => {
        event.preventDefault()
        if(!check) {
        setLoading(true)
        const book = {
            title,
            ISBN,
            description,
            publisher,
            publishedYear : parseInt(publishedYear, 10),
            categories: stack
        }
        const newBook = await booksService.addBook(book)
        setTitle('')
        setISBN('')
        setDescription('')
        setPublisher('')
        setPublishedYear('')
        dispatch(addNewBook(newBook))
        dispatch(setStack([]))
        onClose()
        setLoading(false)
    }
    }

    return (
        <>
        <Button onClick={onOpen}>Add Book</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add new book</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form onSubmit={handleAddBook}>
                        <FormControl isInvalid={titleError}>
                            <FormLabel>Title</FormLabel>
                            <Input type='text' value={title} onChange={(e) => setTitle(e.target.value)}/>
                            { titleError ? <FormErrorMessage>The title can't be empty</FormErrorMessage> : <FormHelperText>The title of the book</FormHelperText> }
                        </FormControl>
                        <FormControl isInvalid={ISBNError}>
                            <FormLabel>ISBN</FormLabel>
                            <Input type='text' value={ISBN} onChange={(e) => setISBN(e.target.value)} />
                            { ISBNError ? <FormErrorMessage>The ISBN can't be empty</FormErrorMessage> : <FormHelperText>The ISBN of the book</FormHelperText> }
                        </FormControl>
                        <FormControl isInvalid={descriptionError}>
                            <FormLabel>Description</FormLabel>
                            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                            { descriptionError ? <FormErrorMessage>The description can't be empty</FormErrorMessage> : <FormHelperText>Description of the book</FormHelperText> }
                        </FormControl>
                        <FormControl isInvalid={publisherError}>
                            <FormLabel>Publisher</FormLabel>
                            <Input type='text' value={publisher} onChange={(e) => setPublisher(e.target.value)}/>
                            { publisherError ? <FormErrorMessage>The publisher can't be empty</FormErrorMessage> : <FormHelperText>The publisher of the book</FormHelperText> }
                        </FormControl>
                        <FormControl isInvalid={publishedYearError}>
                            <FormLabel>Published year</FormLabel>
                            <Input type='number' value={publishedYear} onChange={(e) => setPublishedYear(e.target.value)} />
                            { publishedYearError ? <FormErrorMessage>The year of published can't be lower than 0 or higher than 2022</FormErrorMessage> : <FormHelperText>The published year of the book</FormHelperText> }
                        </FormControl>
                        <FormControl isInvalid={categoriesError}>
                            <FormLabel>Categories</FormLabel>
                            <Box border='1px' borderColor='purple' p='5px'>
                            <Text>Current choices:</Text>
                                {stack.length === 0 && <Text color='red'>No choice currently</Text>}
                                {
                                    stack.map(category => (
                                        <Tag as={Button} size='md' key={category} colorScheme='purple' m="5px" onClick={() => removeCategoryFromStack(category)}>
                                            {category}
                                        </Tag>
                                    ))
                                }
                            </Box>
                            <Box border='1px' borderColor='cyan' p='5px'>
                                <Text>Lists:</Text>
                                {categories.map(category => (
                                    <Tag as={Button} size='md' key={category} colorScheme='cyan' m="5px" onClick={() => addCategoryToStack(category)} isDisabled={stack.includes(category)}>
                                        {category}
                                    </Tag>
                                ))}
                            </Box>
                            {categoriesError ? <FormErrorMessage>Categories can't be empty</FormErrorMessage> : <FormHelperText>Categories for the book</FormHelperText>}
                        </FormControl>
                        <Center p='10px'>
                            <Button type="submit" colorScheme='pink'  isLoading={loading}>
                                Add
                            </Button>
                        </Center>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='red' onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )
}

export default BookAddForm
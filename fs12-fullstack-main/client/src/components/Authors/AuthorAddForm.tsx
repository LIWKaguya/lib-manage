import { Button, Center, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import React, { useState } from "react"


import authorsService from '../../services/authors.service'
import { useAppDispatch } from "redux/hooks"
import { addAuthor } from "redux/slices/authors.slice"

const AuthorAddForm = () => {
    const [ name, setName ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ yearOfBirth, setYearOfBirth ] = useState('')
    const [ loading, setLoading ] = useState(true) 

    const {onOpen, isOpen, onClose} = useDisclosure()
    const dispatch = useAppDispatch()

    const nameError = name === ''
    const descriptionError = description === ''
    const yearOfBirthError = parseInt(yearOfBirth) <= 0 || parseInt(yearOfBirth) > 2022 || yearOfBirth === ''
    const check = nameError || descriptionError || yearOfBirthError

    const handleAddAuthor = async (event : React.FormEvent<HTMLElement>) => {
        event.preventDefault()
        if(!check) {
        setLoading(true)
        event.preventDefault()
        const author = {
            name, 
            description,
            yearOfBirth: parseInt(yearOfBirth, 10)
        }
        const newAuthor = await authorsService.addAuthor(author)
        dispatch(addAuthor(newAuthor))
        setName('')
        setDescription('')
        setYearOfBirth('')
        onClose()
        setLoading(false)
        }
    }

    return (
        <>
        <Button onClick={onOpen} m={5}>Add Author</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader m={5}>Add new author</ModalHeader>
                <ModalCloseButton /> 
                <ModalBody>
                    <form onSubmit={handleAddAuthor}>
                        <FormControl p='5px' isInvalid={nameError}>
                            <FormLabel>Name</FormLabel>
                            <Input type='text' value={name} onChange={(e) =>setName(e.target.value)} />
                            {nameError ? <FormErrorMessage>The name can't be empty</FormErrorMessage> : <FormHelperText>The name of the author</FormHelperText>}
                        </FormControl>
                        <FormControl p='5px' isInvalid={descriptionError}>
                        <FormLabel>Description</FormLabel>
                            <Input type='text' value={description} onChange={(e) =>setDescription(e.target.value)} />
                            {descriptionError ? <FormErrorMessage>The description can't be empty</FormErrorMessage> : <FormHelperText>Description of the author</FormHelperText> }
                        </FormControl>
                        <FormControl p='5px' isInvalid={yearOfBirthError}>
                        <FormLabel>Year of birth</FormLabel>
                            <Input type='number' value={yearOfBirth} onChange={(e) =>setYearOfBirth(e.target.value)} />
                            { yearOfBirthError ?<FormErrorMessage>The year can't be lower than 0 or higher than 2022</FormErrorMessage> : <FormHelperText>The year of birth of the author</FormHelperText> }
                        </FormControl>
                        <Center p='10px'>
                            <Button type="submit" colorScheme='pink'  isLoading={loading}>Submit</Button>
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

export default AuthorAddForm
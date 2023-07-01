import { Button, Center, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import { setAuthors } from "redux/slices/authors.slice"
import { AuthorQuery } from "types"
import authorsService from '../../services/authors.service'
import NotFound from "../not_found/NotFound"

const EditAuthorModal = () => {
    const { onOpen, isOpen, onClose } = useDisclosure()
    const [loading, setLoading] = useState(false)
    const dispatch = useAppDispatch()
    const authors = useAppSelector(state => state.authors)
    const { id } = useParams()

    const [ description, setDescription ] = useState('')
    const [ yearOfBirth, setYearOfBirth ] = useState('')

    if(!id) return <NotFound />

    const isError = description === '' && yearOfBirth === ''

    const handleEditAuthor = async (event : React.FormEvent<HTMLElement>) => {
        event.preventDefault()
        if(!isError) {
            setLoading(true)
            const update : Partial<AuthorQuery> = {}
            if(description) update['description'] = description
            if(yearOfBirth) update['yearOfBirth'] = parseInt(yearOfBirth, 10)
            const result = await authorsService.editAuthor(id, update)
            setDescription('')
            setYearOfBirth('')
            dispatch(setAuthors(authors.map(a => a._id === result._id ? result : a)))
            onClose()
            setLoading(false)
        }
    }

    return (
        <>
        <Button onClick={onOpen} m={5}>Edit</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                     <form onSubmit={handleEditAuthor} >
                        <FormControl isInvalid={isError}>
                            <FormLabel>Description</FormLabel>
                            <Input value={description} onChange={(e) => setDescription(e.currentTarget.value)} />
                            {isError ? <FormErrorMessage>Please fill at least one input</FormErrorMessage> : <FormHelperText>The description of author</FormHelperText>}
                            
                        </FormControl>
                        <FormControl isInvalid={isError}>
                            <FormLabel>Year of birth</FormLabel>
                            <Input type='number' value={yearOfBirth} onChange={(e) => setYearOfBirth(e.target.value)} />
                            {isError ?  <FormErrorMessage>Please fill at least one input</FormErrorMessage> : <FormHelperText>The year of birth author</FormHelperText> }
                        </FormControl>
                        <Center>
                            <Button type='submit' isLoading={loading}>Edit</Button>
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

export default EditAuthorModal
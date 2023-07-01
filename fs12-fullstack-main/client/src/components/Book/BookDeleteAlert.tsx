import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure } from "@chakra-ui/react"
import {useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import NotFound from "../not_found/NotFound"
import booksService from '../../services/books.service'

const BookDeleteAlert = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [loading, setLoading] = useState(false)
    const cancelRef = useRef<any>()
    const { id } = useParams()
    const navigate = useNavigate()

    if(!id) return <NotFound />

    const handleDeleteBook = async (id : string) => {
        setLoading(true)
        await booksService.deleteBook(id)
        navigate('/books')
    }

    return (
        <>
      <Button colorScheme='red' onClick={onOpen} m={5}>
        Delete Book
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Book
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose} ref={cancelRef}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={() => handleDeleteBook(id)} ml={3} isLoading={loading}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
    )
}

export default BookDeleteAlert
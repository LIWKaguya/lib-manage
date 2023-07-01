import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure } from "@chakra-ui/react"
import { useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import authorsService from "services/authors.service"
import NotFound from "../not_found/NotFound"

const DeleteAuthorAlert = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [loading, setLoading] = useState(false)
    const cancelRef = useRef<any>()
    const { id } = useParams()
    const navigate = useNavigate()

    if(!id) return <NotFound />

    const handleDeleteAuthor = async (id : string) => {
        setLoading(true)
        await authorsService.deleteAuthor(id)
        navigate('/authors')
    }

    return (
        <>
      <Button colorScheme='red' onClick={onOpen} m={5}>
        Delete Author
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Author
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose} ref={cancelRef}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={() => handleDeleteAuthor(id)} ml={3} isLoading={loading}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
    )
}

export default DeleteAuthorAlert
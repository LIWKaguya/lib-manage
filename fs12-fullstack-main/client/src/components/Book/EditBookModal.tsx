import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs, useDisclosure } from "@chakra-ui/react"

import EditBookModalOne from "./EditBookModalOne"
import EditBookModalTwo from "./EditBookModalTwo"

const EditBookModal = () => {
    const {onOpen, isOpen, onClose} = useDisclosure()

    return (
        <>
        <Button onClick={onOpen} m={5}>Edit</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Tabs isFitted>
                        <TabList >
                            <Tab>Description</Tab>
                            <Tab>Authors</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel><EditBookModalOne onClose={onClose}/></TabPanel>
                            <TabPanel><EditBookModalTwo onClose={onClose}/></TabPanel>
                        </TabPanels>
                    </Tabs>
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

export default EditBookModal
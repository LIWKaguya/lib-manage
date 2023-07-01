import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs, useDisclosure } from "@chakra-ui/react"
import SearchModalPageOne from "./SearchModalPageOne"
import SearchModalPageTwo from "./SearchModalPageTwo"


const SearchPopover = () => {
    const {isOpen, onOpen, onClose} = useDisclosure()

    return (
        <>
        <Button onClick={onOpen}>Search</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Search</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Tabs isFitted>
                        <TabList >
                            <Tab>By filter</Tab>
                            <Tab>By ISBN</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel><SearchModalPageOne /></TabPanel>
                            <TabPanel><SearchModalPageTwo /></TabPanel>
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

export default SearchPopover
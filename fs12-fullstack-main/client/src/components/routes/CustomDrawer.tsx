import { useDisclosure, Drawer, DrawerContent, DrawerHeader, DrawerCloseButton, VStack, Link, DrawerOverlay, IconButton } from "@chakra-ui/react"
import { HamburgerIcon } from "@chakra-ui/icons"

import { Link as ReachLink } from "react-router-dom"
import { useRef } from "react"
import { useAppSelector } from "redux/hooks"


function CustomDrawer() {
    const user = useAppSelector(state => state.user)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef<HTMLButtonElement>(null)


    return (
        <>
            <IconButton colorScheme='red' aria-label="open-drawer" variant='ghost' onClick={onOpen} icon={<HamburgerIcon />}/>
            <Drawer isOpen={isOpen} onClose={onClose} placement='right' finalFocusRef={btnRef}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Menu</DrawerHeader>
                <VStack spacing='24px'>
                    { user.isAdmin && <Link as={ReachLink} onClick={onClose} to='/admin'>Admin</Link> }
                    <Link as={ReachLink} to='/' onClick={onClose}>Home</Link> 
                    <Link as={ReachLink} to='/authors' onClick={onClose}>Authors</Link>
                    <Link as={ReachLink} to='/books' onClick={onClose}>Books</Link>
                </VStack>
            </DrawerContent>
            </Drawer>
        </>
    )
}

export default CustomDrawer
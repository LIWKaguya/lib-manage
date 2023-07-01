import {  useColorMode, IconButton } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

const ThemeButton = () => {
    const { colorMode, toggleColorMode } = useColorMode()
   
    return (
        <IconButton colorScheme='red' variant='ghost' aria-label='Theme Changer' onClick={toggleColorMode} icon={colorMode === 'light' ?  <MoonIcon /> : <SunIcon />}/>
    )
}

export default ThemeButton
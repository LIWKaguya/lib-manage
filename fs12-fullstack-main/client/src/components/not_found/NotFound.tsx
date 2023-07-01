import { Button, Center, Text } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

const NotFound = () => {
    const navigate = useNavigate()

    const goBackHome = () => {
        navigate('/')
    }

    return (
        <Center flexDirection='column'>
            <Text fontSize='6xl'>Error</Text>
            <Button onClick={goBackHome}>Main Page</Button>
        </Center>
    )
}

export default NotFound
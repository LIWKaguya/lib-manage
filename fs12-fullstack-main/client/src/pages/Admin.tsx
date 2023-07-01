import { Button, Center, Text } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

const Admin = () => {
    const navigate = useNavigate()

    const goBack = () => {
        navigate(-1)
    }

    return (
        <Center flexDir='column'>
            <Text fontSize='4xl'>Nothing here yet :P</Text>
            <Button onClick={goBack} m={5}>Back</Button>
        </Center>
    )
}

export default Admin
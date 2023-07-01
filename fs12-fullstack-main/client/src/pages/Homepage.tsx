import { useNavigate } from "react-router-dom"
import { Button, Center, Text } from "@chakra-ui/react"

import { useAppDispatch } from "redux/hooks"
import { setUser } from "redux/slices/user.slice"

const Homepage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(setUser({}))
    navigate('/login')
  }

  return (
    <>
      <Center flexDirection='column'>
        <Text fontSize='6xl'>Homepage</Text>
        <Button colorScheme='cyan' onClick={handleLogout} m={5}>Logout</Button>
        <Text fontSize='3xl'>There should be something here but there isn't :P</Text>
      </Center>
    </>
  )
}

export default Homepage
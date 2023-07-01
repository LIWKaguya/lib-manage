import { CredentialResponse, GoogleLogin } from "@react-oauth/google"
import { Center, Text } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

import authService from "services/auth.service"
import { setUser } from "redux/slices/user.slice"
import { useAppDispatch } from "redux/hooks"


const LoginPage = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();

    const handleGoogleSuscess = async ( response : CredentialResponse ) => {
        const id_token = response.credential as string
        const { user, token, exp } = await authService.authenticate(id_token)
        window.localStorage.setItem('libmaUser', JSON.stringify(user))
        window.localStorage.setItem('libmaUserToken', token)
        window.localStorage.setItem('exp', exp)
        dispatch(setUser(user))
        navigate('/')
    }

    return (
        <>
         
        <Center flexDirection='column'>
            <Text fontSize='6xl' m={5}>Welcome !</Text>
            <Text color='red' m={5}>to the library :)</Text>
            <GoogleLogin onSuccess={handleGoogleSuscess} />
        </Center> 
        </>
    )
}


export default LoginPage
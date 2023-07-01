import { axiosAuthInstance } from "./base"

const authenticate = async (id_token: string) => {
    const response = await axiosAuthInstance.post('/google', {}, {
        headers: {
            'id_token' : id_token,
            'Content-Type' : 'application/json'
        }
    })
    return response.data
}

const methods = { authenticate }

export default methods
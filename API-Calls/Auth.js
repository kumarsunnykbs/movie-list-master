import axios from "axios"

export const Login = async (body) => {
    try {
        const res = await axios.post(`/api/login`, body)
        return res
    } catch (error) {
        const jsonObj = JSON.stringify(error)
        const newError = JSON.parse(jsonObj)
        if (newError.status === 400) {
            return { data: { message: "User not found", status: newError.status, userDetails: {}, moviesList: [] } }
        } else if (newError.status === 401) {
            return { data: { message: "Incorrect password, Please check your password", status: newError.status, userDetails: {}, moviesList: [] } }
        }
        return { data: { message: newError.message, status: newError.status, userDetails: {}, moviesList: [] } }
    }
}
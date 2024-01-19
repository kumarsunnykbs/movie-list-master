import axios from "axios"

export const getMovies = async (_id) => {
    try {
        const res = await axios.get(`/api/movies?_id=${_id}`)
        return res.data
    } catch (error) {
        const jsonObj = JSON.stringify(error)
        const newError = JSON.parse(jsonObj)
        return { data: { message: newError.message, status: newError.status, userDetails: {} } }
    }
}

export const getMovieById = async (_id) => {
    try {
        const res = await axios.get(`/api/movies/getMovieById?id=${_id}`)
        return res.data
    } catch (error) {
        const jsonObj = JSON.stringify(error)
        const newError = JSON.parse(jsonObj)
        return { data: { message: newError.message, status: newError.status, userDetails: {} } }
    }
}

export const createMovie = async (body) => {
    try {
        const res = await axios.post(`/api/movies`, body)
        return res.data
    } catch (error) {
        const jsonObj = JSON.stringify(error)
        const newError = JSON.parse(jsonObj)
        return { data: { message: newError.message, status: newError.status } }
    }
}

export const updateMovie = async (body) => {
    try {
        const res = await axios.put(`/api/movies`, body)
        return res.data
    } catch (error) {
        const jsonObj = JSON.stringify(error)
        const newError = JSON.parse(jsonObj)
        return { data: { message: newError.message, status: newError.status, userDetails: {} } }
    }
}
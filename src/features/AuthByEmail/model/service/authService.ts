import $api from "@/http";
import {authInterface} from "@/features/AuthByEmail/model/types/types";



export const login = async (email: string, password: string) => {
    try {

        const response = await $api.post('/auth/login', {email, password})
        const userData: authInterface = response.data
        localStorage.setItem('token', userData.accessToken)
        return userData
    }  catch (error: any) {
        console.log(error.response?.data?.message)
        throw error
    }
}

export const registration = async (email: string, password: string) => {
    try {
        const response = await $api.post('/auth/registration', {email, password})
        console.log(response)
        const userData: authInterface = response.data
        localStorage.setItem('token', userData.accessToken)
        console.log(response)
        return userData
    }  catch (error: any) {
        console.log(error.response?.data?.message)
        throw error
    }
}

export const logout = async () => {
    try {
        const response = await $api.get('/auth/logout')
        localStorage.removeItem('token')
    } catch (error: any) {
        console.log(error.response?.data?.message)
        throw error
    }
}

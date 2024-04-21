import $api from "@/http";
import {authData} from "@/features/AuthByEmail/model/types/types";
import {makeClient} from "@/shared/lib/graphQL/apollo-wrapper";
import Registration from "@/shared/lib/graphQL/Query&Mutation/Auth/registrationMutation.graphql";
import Login from "@/shared/lib/graphQL/Query&Mutation/Auth/loginMutation.graphql";
import Logout from "@/shared/lib/graphQL/Query&Mutation/Auth/logoutMutation.graphql";
import {IUser} from "@/entities/User/model/type/type";

const setUser = (data: authData) => {
    console.log(data)

    localStorage.setItem('token', data.accessToken)

    const User: IUser = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        isActivated: data.user.isActivated,
        avatar: data.user.avatar,
        banned: data.user.banned,
        banReason: data.user.banReason,
        lastLessonDate: data.user.lastLessonDate,
        newLimit: data.user.newLimit,
        oldLimit: data.user.oldLimit,
        timeForCard: data.user.timeForCard,
        roles: data.roles
    }

    return User
}

export const login = async (email: string, password: string) => {
    try {
        const client = makeClient()
        const {data} = await client.mutate({
            mutation: Login,
            variables: {
                input: {
                    email: email,
                    password: password
                }
            }
        })
        if (data) {
            return setUser(data.login)
        }

    } catch (error: any) {

        console.log(error)
    }
}

export const reg = async (email: string, password: string) => {
    try {
        const client = makeClient()
        const {data} = await client.mutate({
            mutation: Registration,
            variables: {
                input: {
                    email: email,
                    password: password
                }
            }
        })

        if (data) {
            return setUser(data.registration)
        }

    } catch (error: any) {

        console.log(error)
    }
}

export const logout = async (accessToken: string) => {
    try {
        const client = makeClient()
        const {data} = await client.mutate({
            mutation: Logout,
            variables: {
                input: {
                    accessToken:  accessToken
                }
            }
        })
        localStorage.removeItem('token')
        return data.logout.email
    } catch (error: any) {
        console.log(error.response?.data?.message)
        throw error
    }
}

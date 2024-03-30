import {create} from "zustand";
import {combine} from "zustand/middleware";
import {AuthActions, initialAuthState, IUser} from "@/features/AuthByEmail/model/types/types";
import {login, logout, registration} from "@/features/AuthByEmail/model/service/authService";
import {getClient} from "@/shared/lib/graphQL/client.js";
import Registration from '../../../../shared/lib/graphQL/Query&Mutation/Auth/registrationMutation.graphql'
import {makeClient} from "@/shared/lib/graphQL/apollo-wrapper";

export const useAuthStore = create<initialAuthState & AuthActions>(
    combine<initialAuthState,AuthActions>({
            user: {} as IUser,
            isAuth: false,
            isLoading: false,
            error: '',
            password: '',
            email: ''
        },
        (set) => ({
            setAuth: (bool: boolean) => set({isAuth: bool}),
            setUser: (user: IUser) => set({user}),
            setIsLoading : (bool: boolean) => set({isLoading: bool}),
            setPassword: (password: string) => set({password}),
            setEmail: (email: string) => set({email}),
            setError: (error: string) => set({error}),

            login: async (email: string, password: string) => {
                try {
                    const userData = await login(email, password)
                    set({isAuth: true, user: userData.user})
                } catch (error: any) {
                    set({error: error})
                    console.log(error.response?.data?.message)
                }

            },
            registration: async (email: string, password: string) => {
                try {
                    const client = makeClient()
                    const {data} = await client.mutate({
                        mutation: Registration,
                        variables: {
                            input: {
                                email: email,
                                password: password
                            }
                    }})
                    console.log(data)
                  if(data.registration.accessToken) {
                      localStorage.setItem('token', data.registration.accessToken)
                  }
                    const User: IUser = {
                        id: data.registration.user.id,
                        email: data.registration.user.email,
                        name: data.registration.user.name,
                        isActivated: data.registration.user.isActivated,
                        avatar: data.registration.user.avatar,
                        banned: data.registration.user.banned,
                        banReason: data.registration.user.banReason,
                        lastLessonDate: data.registration.user.lastLessonDate,
                        newLimit: data.registration.user.newLimit,
                        oldLimit: data.registration.user.oldLimit,
                        timeForCard: data.registration.user.timeForCard,
                        roles: data.registration.roles
                    }
                    set({isAuth: true, user: User})
                } catch (error: any) {
                    set({error: error})
                    console.log(error)
                }
            },
            logout: async () => {
                try {
                    await logout()
                    set({isAuth: false, user: {} as IUser})
                } catch (error: any) {
                    set({error: error})
                    console.log(error.response?.data?.message)
                }
            }
        })
    ))


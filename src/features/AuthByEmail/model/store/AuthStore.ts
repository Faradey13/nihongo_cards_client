import {create} from "zustand";
import {combine} from "zustand/middleware";
import {AuthActions, initialAuthState, IUser} from "@/features/AuthByEmail/model/types/types";
import {login, logout, registration} from "@/features/AuthByEmail/model/service/authService";


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
                    const userData = await registration(email, password)
                    set({isAuth: true, user: userData.user})
                } catch (error: any) {
                    set({error: error})
                    console.log(error.response?.data?.message)
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


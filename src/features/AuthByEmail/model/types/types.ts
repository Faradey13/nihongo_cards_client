export interface initialAuthState {
    user: IUser;
    password: string;
    email: string;
    isAuth: boolean;
    isLoading: boolean;
    error?: string;
}

export interface AuthActions {
    setAuth: (bool: boolean) => void;
    setUser: (user: IUser) => void;
    setPassword: (password: string) => void,
    setEmail: (password: string) => void,
    setIsLoading: (bool: boolean) => void;
    login: (email: string, password: string) => Promise<void>;
    registration: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}


export interface IUser {
    id: number;
    email: string;
    isActivated: boolean;

}
export interface authInterface {
    accessToken : string;
    user: IUser
}
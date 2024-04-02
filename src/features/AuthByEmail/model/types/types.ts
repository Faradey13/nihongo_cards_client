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
    logout: (accessToken: string) => Promise<void>;
}


export interface IUser {
    id: number;
    email: string;
    isActivated: boolean;
    name?: string;
    avatar?: string;
    banned?: boolean;
    banReason?: string;
    lastLessonDate?: Date;
    newLimit: number;
    oldLimit: number;
    timeForCard?: number;
    roles: role[]

}
export interface authInterface {
    accessToken : string;
    user: IUser
}

export interface role {
    value: string;
    description: string
}

export interface authData {
    user: IUser;
    roles: role[];
    accessToken: string;
}
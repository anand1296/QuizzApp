export type UserState = {
    username: string
    password: string,
    isLoggedin: boolean,
    isAdmin?: boolean,
    avatar? : string
};

export const initialUserState: UserState = {
    username: '',
    password: '',
    isAdmin: false,
    isLoggedin: false
};
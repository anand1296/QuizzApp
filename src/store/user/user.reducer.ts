import { Action } from "./user.actions";
import { initialUserState, UserState } from "./user.state";

const userReducer = (state: UserState = initialUserState, action: Action): UserState => {
    switch (action.type) {
        case 'setUser':
            return {
                ...state,
                username: action.payload.username,
                password: action.payload.password,
                isAdmin: action.payload.isAdmin ?? false
            };
        case 'loginSuccess':
            return {
                ...state,
                isLoggedin: true
            };
        case 'logoutSuccess':
            return {
                ...state,
                isLoggedin: false
            };
        case 'resetLoginForm': 
            return {
                ...state,
                username: '',
                password: '',
                isLoggedin: false
            }
        default: return state
    }
}

export default userReducer;
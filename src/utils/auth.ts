import { TokenService } from "./token";

export const AuthService = {

    isUserAuthenticated: ():boolean => {
        return TokenService.getToken()?.length ? true : false;
    },
    signIn: ():void => {
        TokenService.setToken("VYUcd67t67fgsytdsyudsgygds");
    },
    signOut: ():void => {
        TokenService.removeToken();
    }
}
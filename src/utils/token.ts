export const TokenService = {

    setToken: (token: string) => {
        sessionStorage.setItem("token", token);
    },

    getToken: ():string | null => {
        return sessionStorage.getItem("token");
    },

    removeToken: () => {
        sessionStorage.removeItem("token");
    }

}
import {
  createSlice
} from "@reduxjs/toolkit";
import { initialUserState, UserState } from "./user.state";

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUser(state: UserState, action) {
      return {
        ...state,
        username: action.payload.username,
        password: action.payload.password,
        isLoggedin: true,
        isAdmin: action.payload.isAdmin ?? false,
      };
    },
    resetUser(state: UserState, action) {
        return {
          ...state,
          username: "",
          password: "",
          isLoggedin: false,
          isAdmin: false
        };
      },
  },
});

console.log(userSlice.actions.setUser({username: "", password: "", isLoggedIn: false}));

export default userSlice.reducer;
export const { setUser, resetUser } = userSlice.actions;

import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    loading: false
  },
  reducers: {
    setLoader(state, action) {
        state.loading = action.payload
    }
  },
});

export default loaderSlice.reducer;
export const { setLoader } = loaderSlice.actions;
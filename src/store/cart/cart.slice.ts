import { createSlice } from "@reduxjs/toolkit";
import { initialCartState, CartState } from "./cart.state";

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addItem(state: Array<CartState>, action) {
      state.push(action.payload);
    },
    removeItem(state: Array<CartState>, action) {
      state.splice(action.payload, 1);
    },
    removeAll(state: Array<CartState>, action) {
      return [];
    },
  },
});

console.log(
  cartSlice.actions.addItem({ id: 1, name: "Bread", price: 50, exp: new Date().setDate(new Date().getDate() + 3) })
);

export default cartSlice.reducer;
export const { addItem, removeItem, removeAll } = cartSlice.actions;

export type CartState = {
    id: number,
    name: string,
    price: number,
    exp: Date
};

export const initialCartState: Array<CartState> = [];
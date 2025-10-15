import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        total: 0
    },
    reducers: {
        addItem: (state, action) => {
            const { product, quantity } = action.payload;
            const productInCart = state.items.find(item => item.id === product.id);
            if (!productInCart) {
                state.items.push({ ...product, quantity });
            } else {
                productInCart.quantity += quantity;
            }
            state.total = state.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            state.total = state.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        },
        clearCart: (state) => {
            state.items = [];
            state.total = 0;
        },
    }
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

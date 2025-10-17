import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        total: 0
    },
    reducers: {
        addItem: (state, action) => {
            const { product, quantity } = action.payload;
            const productInCart = state.items.find(item => item._id === product._id);
            
            if (!productInCart) {
                state.items.push({ ...product, quantity });
            } else {
                productInCart.quantity += quantity;
            }
            state.total = state.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item._id !== action.payload);
            state.total = state.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        },
        updateItemQuantity: (state, action) => {
            const { itemId, quantity } = action.payload;
            const itemToUpdate = state.items.find(item => item._id === itemId);
            if (itemToUpdate) {
                itemToUpdate.quantity = quantity;
            }
            state.total = state.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        },
        clearCart: (state) => {
            state.items = [];
            state.total = 0;
        },
    }
});

export const { addItem, removeItem, updateItemQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
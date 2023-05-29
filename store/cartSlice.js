import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const item = state.cartItems.find((p) => p.id === action.payload.id)
            if(item){
                item.quantity++;
                item.attributes.price = item.priceForOneItem * item.quantity;
            } else {
                state.cartItems.push({ ...action.payload, quantity: 1 });
            }
        },
        updateCart: (state, action) => {
            state.cartItems = state.cartItems.map((p) => {
                if(p.id === action.payload.id){
                    if(action.payload.key === "quantity"){
                        p.attributes.price = p.priceForOneItem * action.payload.value
                    }
                    return {...p, [action.payload.key]: action.payload.value}
                }
                return p; //return product without any changes if its not the targeted product
            })
        },
        removeFromCart: (state, action) => {
            //return all the existing products except the one that matches the given id
            state.cartItems = state.cartItems.filter((p) => p.id !== action.payload.id)
        }
    },
})

export const { addToCart, updateCart, removeFromCart } = cartSlice.actions

export default cartSlice.reducer
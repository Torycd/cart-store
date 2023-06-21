import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    addItemTocart(state, action) {
      const newItem = action.payload;
      const existItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existItem.quantity++;
        existItem.totalPrice = existItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existItem = state.items.find((item) => item.id === id)
      state.totalQuantity--;
      if (existItem.quantity === 1){
        state.items = state.items.filter((item) => item.id !== id) 
      } else {
        existItem.quantity--;
        existItem.totalPrice = existItem.totalPrice - existItem.price;
      }

    },
  },
});

export const sendData = (cart) => {
  return async (dispatch) => {
    dispatch(uiActions.showNotication({
      status: "pending",
        title: "sending...",
        message: "sending cart data!",
    }))
    const sendRequest = async () => {
      const response = await fetch('', {
        method: 'PUT',
        body: JSON.stringify(cart)
      })
      if(!response.ok){
        throw new Error('Something went wrong')
      }
    }
    try {
      await sendRequest();
      dispatch(uiActions.showNotication({
        status: "success",
        title: "Success!",
        message: "sent cart data successfully!",
      }))
      
    } catch (error){
      dispatch(
        uiActions.showNotication({
          status: "error",
          title: "Error!",
          message: "sending cart data failed!",
        })
      );
    }

  }
};

export const cartActions = cartSlice.actions;

export default cartSlice;

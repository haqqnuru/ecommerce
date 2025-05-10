
import { CartActionTypes } from './cart.types';

//action for cart to appear or stay hidden
export const toggleCartHidden = () => ({
  type:CartActionTypes.TOGGLE_CART_HIDDEN
});

// action for the cart to add
export const addItem = item => ({
  type:CartActionTypes.ADD_ITEM,
  payload: item
});

// action for the cart to remove or deduct
export const removeItem = item => ({
  type: CartActionTypes.REMOVE_ITEM,
  payload: item
});

// action for the cart to clear
export const clearItemFromCart = item => ({
  type:CartActionTypes.CLEAR_ITEM_FROM_CART,
  payload: item
});

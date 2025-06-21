import { createSelector } from 'reselect';

const selectCart = state => state.cart;

//recalculates when state.cart changes.
export const selectCartItems = createSelector(
  [selectCart],
  cart => cart.cartItems
);

// hides and shows cart
export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
  );

//calculates the total number of items in the cart by summing up quantity fields from each cart item.
export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce(
      (accumalatedQuantity, cartItem) =>
        accumalatedQuantity + cartItem.quantity,
      0
    )
);

// calculates to everything, grand sum
export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems =>
      cartItems.reduce(
        (accumalatedQuantity, cartItem) =>
          accumalatedQuantity + cartItem.quantity * cartItem.price,
        0
      )
  );
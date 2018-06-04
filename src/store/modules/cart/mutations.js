export const PUSH_PRODUCT_TO_CART = 'PUSH_PRODUCT_TO_CART';
export const INCREMENT_ITEM_QUANTITY = 'INCREMENT_ITEM_QUANTITY';
export const SET_CHECKOUT_STATUS = 'SET_CHECKOUT_STATUS';
export const SET_EMPTY_CART = 'SET_EMPTY_CART';

export default {
  [PUSH_PRODUCT_TO_CART]: (state, productId) => {
    state.items.push({
      id: productId,
      quantity: 1
    })
  },

  [INCREMENT_ITEM_QUANTITY]: (state, cartItem) => {
    cartItem.quantity++
  },

  [SET_CHECKOUT_STATUS]: (state, status) => {
    state.checkout_status = status
  },

  [SET_EMPTY_CART]: (state) => {
    state.items = []
  }
}

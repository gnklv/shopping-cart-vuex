export const SET_PRODUCTS = 'SET_PRODUCTS';
export const DECREMENT_PRODUCT_INVENTORY = 'DECREMENT_PRODUCT_INVENTORY';
export const UPDATE_PRODUCT_INVENTORY = 'UPDATE_PRODUCT_INVENTORY';

export default {
  [SET_PRODUCTS]: (state, products) => {
    state.items = products
  },

  [DECREMENT_PRODUCT_INVENTORY]: (state, product) => {
    product.inventory--
  },

  [UPDATE_PRODUCT_INVENTORY]: (state, [product, inventory]) => {
    product.inventory += inventory
  }
}

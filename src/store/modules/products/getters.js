export const GET_AVAILABLE_PRODUCTS = 'GET_AVAILABLE_PRODUCTS';
export const GET_PRODUCTS_IS_IN_STOCK = 'GET_PRODUCTS_IS_IN_STOCK';

export default {
  [GET_AVAILABLE_PRODUCTS]: state => {
    state.items.filter(product => product.inventory > 0);
  },

  [GET_PRODUCTS_IS_IN_STOCK]: () => product => product.inventory > 0
}

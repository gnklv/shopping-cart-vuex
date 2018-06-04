export const GET_CART_PRODUCTS = 'GET_CART_PRODUCTS';
export const GET_CART_TOTAL = 'GET_CART_TOTAL';

export default {
  [GET_CART_PRODUCTS]: (state, getters, rootState) => {
    return state.items.map(cartItem => {
      const product = rootState.products.items.find(product => product.id === cartItem.id);
      return {
        title: product.title,
        price: product.price,
        quantity: cartItem.quantity
      }
    })
  },

  [GET_CART_TOTAL]: (state, getters) => getters.GET_CART_PRODUCTS.reduce((total, product) => total + product.price * product.quantity, 0)
}

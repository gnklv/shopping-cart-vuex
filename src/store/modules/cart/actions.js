import shop from '@/api/shop';

export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
export const CHECKOUT = 'CHECKOUT';

export default {
  [ADD_PRODUCT_TO_CART]: ({ state, commit, rootGetters }, product) => {
    if (rootGetters['products/GET_PRODUCTS_IS_IN_STOCK'](product)) {
      const cartItem = state.items.find(item => item.id === product.id);
      if (!cartItem) {
        commit('PUSH_PRODUCT_TO_CART', product.id);
      } else {
        commit('INCREMENT_ITEM_QUANTITY', cartItem);
      }
      commit('products/DECREMENT_PRODUCT_INVENTORY', product, { root: true });
    }
  },

  [CHECKOUT]: ({ state, commit, rootState }) => {
    shop.buyProducts(
      state.items,
      () => {
        if (state.items.length > 0) {
          state.items.forEach((item) => {
            const product = rootState.products.items.find(product => product.id === item.id);
            commit('products/UPDATE_PRODUCT_INVENTORY', [product, item.quantity], { root: true });
          });
          commit('SET_EMPTY_CART');
          commit('SET_CHECKOUT_STATUS', 'success');
        }
      },
      () => {
        commit('SET_CHECKOUT_STATUS', 'fail');
      }
    )
  }
}

import shop from '@/api/shop';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

export default {
  [FETCH_PRODUCTS]: ({ commit }) => {
    return new Promise((resolve) => {
      shop.getProducts(products => {
        commit('SET_PRODUCTS', products);
        resolve();
      })
    })
  }
}

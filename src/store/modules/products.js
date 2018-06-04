import shop from '@/api/shop';

export default {
  namespaced: true,

  state: {
    items: []
  },

  getters: {
    availableProducts: state => {
      state.items.filter(product => product.inventory > 0);
    },

    productIsInStock: () => product => product.inventory > 0
  },

  mutations: {
    setProducts: (state, products) => {
      state.items = products
    },

    decrementProductInventory: (state, product) => {
      product.inventory--
    },

    updateProductInventory: (state, [product, inventory]) => {
      product.inventory += inventory
    }
  },

  actions: {
    fetchProducts: ({ commit }) => {
      return new Promise((resolve) => {
        shop.getProducts(products => {
          commit('setProducts', products);
          resolve();
        })
      })
    }
  }
}

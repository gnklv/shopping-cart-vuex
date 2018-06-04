import shop from '@/api/shop';

export default {
  namespaced: true,

  state: {
    // {id, quantity}
    items: [],
    checkoutStatus: null
  },

  getters: {
    cartProducts: (state, getters, rootState) => {
      return state.items.map(cartItem => {
        const product = rootState.products.items.find(product => product.id === cartItem.id);
        return {
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity
        }
      })
    },

    cartTotal: (state, getters) => getters.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0)
  },

  mutations: {
    pushProductToCart: (state, productId) => {
      state.items.push({
        id: productId,
        quantity: 1
      })
    },

    incrementItemQuality: (state, cartItem) => {
      cartItem.quantity++
    },

    setCheckoutStatus: (state, status) => {
      state.checkoutStatus = status
    },

    emptyCart: (state) => {
      state.items = []
    },
  },

  actions: {
    addProductToCart: ({ state, commit, rootGetters }, product) => {
      if (rootGetters['products/productIsInStock'](product)) {
        const cartItem = state.items.find(item => item.id === product.id);
        if (!cartItem) {
          commit('pushProductToCart', product.id);
        } else {
          commit('incrementItemQuality', cartItem);
        }
        commit('products/decrementProductInventory', product, { root: true });
      }
    },

    checkout: ({ state, commit, rootState }) => {
      shop.buyProducts(
        state.items,
        () => {
          if (state.items.length > 0) {
            state.items.forEach((item) => {
              const product = rootState.products.items.find(product => product.id === item.id);
              commit('products/updateProductInventory', [product, item.quantity], { root: true });
            });
            commit('emptyCart');
            commit('setCheckoutStatus', 'success');
          }
        },
        () => {
          commit('setCheckoutStatus', 'fail');
        }
      )
    }
  }
}

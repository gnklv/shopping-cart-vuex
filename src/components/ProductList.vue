<template>
  <div>
    <h1>Product List</h1>
    <img
      v-if="loading"
      src="https://i.imgur.com/JfPpwOA.gif"
    >
    <ul v-else>
      <li v-for="product in products">
        {{ product.title }} - {{ product.price | currency }} - {{ product.inventory }}
        <button
          :disabled="!productIsInStock(product)"
          @click="addProductToCart(product)"
        >Add to cart</button>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex';

  export default {
    name: 'ProductList',

    data: () => ({
      loading: false
    }),

    computed: {
      ...mapState('products', {
        products: state => state.items
      }),

      ...mapGetters('products', {
        productIsInStock: 'GET_PRODUCTS_IS_IN_STOCK'
      })
    },

    methods: {
      ...mapActions({
        fetchProducts: 'products/FETCH_PRODUCTS',
        addProductToCart: 'cart/ADD_PRODUCT_TO_CART'
      }),
    },

    created() {
      this.loading = true;
      this.fetchProducts()
        .then(() => this.loading = false)
    }
  }
</script>

<style scoped>

</style>

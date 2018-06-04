<template>
  <div>
    <h1>Shopping Cart</h1>
    <ul>
      <li v-for="product in products">
        {{ product.title }} - {{ product.price | currency }} - {{ product.quantity }}
      </li>
    </ul>
    <p>Total: {{ total | currency}}</p>
    <button @click="CHECKOUT">Checkout</button>
    <p v-if="checkoutStatus">{{ checkoutStatus }}</p>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex';

  export default {
    name: 'ShoppingCart',
    computed: {
      ...mapState('cart', {
        checkoutStatus: state => state.checkout_status
      }),
      ...mapGetters('cart', {
        products: 'GET_CART_PRODUCTS',
        total: 'GET_CART_TOTAL'
      })
    },
    methods: {
      ...mapActions('cart', ['CHECKOUT'])
    }
  }
</script>

<style scoped>

</style>

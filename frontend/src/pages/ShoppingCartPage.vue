<template>
    <h1>Shopping Cart</h1>
    <div v-if="cartItems.length > 0">
        <CartList :products="cartItems" />
        <button class="checkout-button">Proceed to Checkout</button>
    </div>
    <div v-if="cartItems === 0">
        <p>Your cart is empty.</p>
    </div>
</template>

<script>
import axios from "axios";
// import { cartItems } from "../temp-data";
import CartList from "../components/CartList.vue";

export default {
    name: "ShoppingCartPage",
    components: { CartList },
    data() {
        return {
            cartItems: [],
        };
    },
    async created() {
        const response = await axios.get(`/api/users/12345/cart`);
        const cartItems = response.data;
        this.cartItems = cartItems;
    },
};
</script>

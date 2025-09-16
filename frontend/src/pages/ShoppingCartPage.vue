<template>
    <h1>Shopping Cart</h1>
    <div v-if="cartItems.length > 0">
        <CartList :products="cartItems" @remove-from-cart="removeItem($event)" />
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
    methods: {
        async removeItem(productId) {
            const response = await axios.delete(`/api/users/12345/cart/${productId}`);
            const updatedCart = response.data;
            this.cartItems = updatedCart;
            alert("Item removed from cart");
        },
    },
    async created() {
        const response = await axios.get(`/api/users/12345/cart`);
        const cartItems = response.data;
        this.cartItems = cartItems;
    },
};
</script>

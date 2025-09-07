<template>
    <h1>Shopping Cart</h1>
    <div v-if="cartItems.length > 0">
        <div
            class="product-container"
            v-for="product in cartItems"
            :key="product.id"
        >
            <img :src="product.imageName" alt="" class="product-image" />
            <div class="details-wrap">
                <h3>{{ product.name }}</h3>
                <p>{{ product.price }}</p>
            </div>
            <button class="remove-button">Remove from Cart</button>
        </div>
        <button class="checkout-button">Proceed to Checkout</button>
    </div>
    <div v-if="cartItems === 0">
        <p>Your cart is empty.</p>
    </div>
</template>

<script>
import { cartItems } from "../temp-data";
export default {
    name: "ShoppingCartPage",
    data() {
        return {
            cartItems,
        };
    },
};
</script>

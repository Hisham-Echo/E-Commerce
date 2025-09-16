<template>
    <div v-if="product">
        <div class="img-wrap">
            <img :src="product.imageName" />
        </div>
        <div class="product-details">
            <h1>{{ product.name }}</h1>
            <h3 class="price">{{ product.price }}</h3>
            <button
                v-if="!isItemInCart"
                class="add-to-cart"
                @click="addToCart()"
            >
                Add to cart
            </button>
            <button v-if="isItemInCart" class="grey-button">
                Item already in cart
            </button>
            <button class="sign-in" @click="signIn">
                Sign in to add to cart
            </button>
        </div>
    </div>
    <div v-if="!product">
        <NotFoundPage />
    </div>
</template>

<script>
import {
    getAuth,
    sendSignInLinkToEmail,
    isSignInWithEmailLink,
    signInWithEmailLink,
} from "firebase/auth";
import axios from "axios";
// import { products } from "../temp-data";
import NotFoundPage from "./NotFoundPage.vue";

export default {
    name: "ProductDetailPage",
    components: { NotFoundPage },
    data() {
        return {
            product: {},
            cartItems: [],
        };
    },
    methods: {
        async addToCart() {
            await axios.post("/api/users/12345/cart", {
                id: this.$route.params.productId,
            });
            alert("Product added to cart!");
        },
        async signIn() {
            const email = prompt("Please enter your email:");
            const auth = getAuth();
            const actionCodeSettings = {
                url: `http://localhost:8080/products/${this.$route.params.productId}`,
                handleCodeInApp: true,
            };
            await sendSignInLinkToEmail(auth, email, actionCodeSettings);
            alert("Sign-in link sent! Please check your email.");
            window.localStorage.setItem("emailForSignIn", email);
        },
    },
    computed: {
        isItemInCart() {
            return this.cartItems.some(
                (item) => item.id === this.$route.params.productId
            );
        },
    },
    async created() {
        // Check for sign-in link
        const auth = getAuth();
        if (isSignInWithEmailLink(auth, window.location.href)) {
            let email = window.localStorage.getItem("emailForSignIn");
                await signInWithEmailLink(auth, email, window.location.href);
                alert("Successfully signed in!");
                window.localStorage.removeItem("emailForSignIn");
            
        }
        // product fetch
        const response = await axios.get(
            `/api/products/${this.$route.params.productId}`
        );
        const product = response.data;
        this.product = product;
        // cart items fetch
        const cartResponse = await axios.get(`/api/users/12345/cart`);
        const cartItems = cartResponse.data;
        this.cartItems = cartItems;
    },
};
</script>

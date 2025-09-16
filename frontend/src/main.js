import { createApp } from "vue";
import App from "./App.vue";
import "./main.css";
import * as VueRouter from "vue-router";
// pages
import ShoppingCartPage from "./pages/ShoppingCartPage.vue";
import ProductsPage from "./pages/ProductsPage.vue";
import ProductDetailPage from "./pages/ProductDetailPage.vue";
import NotFoundPage from "./pages/NotFoundPage.vue";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBuCft_C6NHg0zq0U3-dqDZ356JkedDF6s",
    authDomain: "vue-site-55783.firebaseapp.com",
    projectId: "vue-site-55783",
    storageBucket: "vue-site-55783.firebasestorage.app",
    messagingSenderId: "172172370422",
    appId: "1:172172370422:web:847e2bccb9641b50d1a7d7",
};

// Initialize Firebase
initializeApp(firebaseConfig);

createApp(App)
    .use(
        VueRouter.createRouter({
            history: VueRouter.createWebHistory(process.env.BASE_URL),
            routes: [
                { path: "/", component: App },
                { path: "/cart", component: ShoppingCartPage },
                { path: "/products", component: ProductsPage },
                { path: "/products/:productId", component: ProductDetailPage },
                { path: "/:pathMatch(.*)*", component: NotFoundPage },
            ],
        })
    )
    .mount("#app");

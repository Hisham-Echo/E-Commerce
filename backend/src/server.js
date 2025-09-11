import express from "express";
import {
    cartItems as cartItemsRaw,
    products as productsRaw,
} from "./temp-data.js";

let cartItems = cartItemsRaw;
let products = productsRaw;

const app = express();
app.use(express.json());

function populateCartIds(ids) {
    return ids.map((id) => products.find((p) => p.id === id));
}

// get items
app.get("/", (req, res) => {
    res.send("Hello, World!");
});
app.get("/products", (req, res) => {
    res.json(products);
});
app.get("/cart", (req, res) => {
    const populatedCart = populateCartIds(cartItems);
    res.json(populatedCart);
});
app.get("/products/:productId", (req, res) => {
    res.json(products.find((product) => product.id === req.params.productId));
});

// add items
app.post("/cart", (req, res) => {
    const productId = req.body.id;
    cartItems.push(productId);
    const populatedCart = populateCartIds(cartItems);
    res.json(populatedCart);
});

// delete items
app.delete("/cart/:productId", (req, res) => {
    const productId = req.params.productId;
    cartItems = cartItems.filter((id) => id !== productId);
    const populatedCart = populateCartIds(cartItems);
    res.json(populatedCart);
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});

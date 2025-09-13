import express from "express";
import { MongoClient, mongoClient } from "mongodb";

async function start() {
    // connect to db
    const url = `mongodb+srv://ecommerce-db:<db_password>@cluster0.eufv08p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    const client = new MongoClient(url);

    await client.connect();
    const db = client.db("fsv-db");

    const app = express();
    app.use(express.json());

    async function populateCartIds(ids) {
        return Promise.all(
            ids.map((id) => db.collection("products").findOne({ id }))
        );
    }

    // get items
    app.get("/products", async (req, res) => {
        await client.connect();
        const db = client.db("fsv-db");
        const products = await db.collection("products").find({}).toArray();
        res.send(products);
    });
    app.get("/users/:userId/cart", async (req, res) => {
        const user = await db
            .collection("users")
            .findOne({ id: req.params.userId });
        const populatedCart = await populateCartIds(user.cartItems);
        res.json(populatedCart);
    });
    app.get("/products/:productId", async (req, res) => {
        const productId = req.params.productId;
        const product = await db
            .collection("products")
            .findOne({ id: productId });
        res.json(product);
    });

    // add items
    app.post("/user/:userId/cart", async (req, res) => {
        const userId = req.params.userId;
        const productId = req.body.id;

        await db
            .collection("users")
            .updateOne({ id: userId }, { $addToSet: { cartItems: productId } });

        const user = await db.collection("users").findOne({ id: userId });
        const populatedCart = await populateCartIds(user.cartItems);
        res.json(populatedCart);
    });

    // delete items
    app.delete("/user/:userId/cart/:productId", async (req, res) => {
        const userId = req.params.userId;
        const productId = req.params.productId;

        await db
            .collection("users")
            .updateOne({ id: userId }, { $pull: { cartItems: productId } });

        const user = await db.collection("users").findOne({ id: userId });
        const populatedCart = await populateCartIds(user.cartItems);
        res.json(populatedCart);
    });

    app.listen(8000, () => {
        console.log("Server is running on port 8000");
    });
}

start();

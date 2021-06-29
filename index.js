const express = require("express");
const app = express();
const cors = require("cors");
const mongodb = require("mongodb");
const URL = "mongodb+srv://tejas:Tejas11@cluster0.vpuuy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const DB = "registration";

app.use(cors())
app.use(express.json())

//posting the data of the user
app.post("/user", async function (req, res) {
    try {
        let connection = await mongodb.connect(URL);
        let db = connection.db(DB);
        await db.collection("user").insertOne(req.body);
        await connection.close();
        res.json({
            message: "user created"
        })
    } catch (error) {
        console.log(error)
    }
})

//getting data of all the users
app.get("/users", async function (req, res) {
    try {
        let connection = await mongodb.connect(URL);
        let db = connection.db(DB);
        let users = await db.collection("user").find().toArray();
        res.json(users)
        await connection.close();
    } catch (error) {
        console.log(error)
    }
})

//getting the user by id
app.get("/user/:id", async function (req, res) {
    try {
        let connection = await mongodb.connect(URL);
        let db = connection.db(DB);
        let user = await db.collection("user").findOne({ _id: mongodb.ObjectID(req.params.id) })
        res.json(user)
        await connection.close();
    } catch (error) {
        console.log(error)
    }
})

//updating the user by id
app.put("/user/:id", async function (req, res) {

    try {
        let connection = await mongodb.connect(URL);
        let db = connection.db(DB);
        await db.collection("user").updateOne({ _id: mongodb.ObjectID(req.params.id) }, { $set: req.body })
        res.json({
            message: "Updated"
        })
        await connection.close();
    } catch (error) {
        console.log(error)
    }

})

//deleting the user by id
app.delete("/user/:id", async function (req, res) {
    try {
        let connection = await mongodb.connect(URL);
        let db = connection.db(DB);
        await db.collection("user").deleteOne({ _id: mongodb.ObjectID(req.params.id)})
        await connection.close()
        res.json({
            message: "Deleted"
        })
    } catch (error) {
        console.log(error)
    }
})

app.listen(process.env.PORT||8000)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const Schema = mongoose.Schema;
const app = express();
let ind = 1;
const { loadEnvFile } = require('node:process');
app.use(cors())
app.use(express.json())
// const dotenv = require('dotenv')
// dotenv.config()

const userSchema = new Schema({
    name: String,
})

const User = mongoose.model('User', userSchema);

async function connectToMongoDB() {

    try {
        process.loadEnvFile();
    } catch (err) {
        // No .env file present (expected in containers) — fall through to process.env
    }
    try {
        console.log(process.env.MONGO_URI)
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB connected")
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}

connectToMongoDB();

app.get('/users', async (req, res) => {
    const allUsers = await User.find({})
    res.json({
        allUsers
    })
})

app.get('/user', async (req, res) => {
    await User.create({
        name: `Brijesh${ind}`
    })
    ind = ind + 1
    res.json({ msg: "User created successfully" })
})

app.listen(3001, () => {
    console.log("server is running on port 3001");
})
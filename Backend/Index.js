const express = require("express");
const connectDb = require("./Config/db");
const cors = require("cors");
const router = require("./Route/router")

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/route", router)

// connect Db
connectDb();

app.get("/", (req, res) => {
    res.end("hey  boogy boogy!")
})



const PORT = process.env.PORT || 3000

app.listen(PORT, (req, res) => {
    console.log("Server is running....");
})
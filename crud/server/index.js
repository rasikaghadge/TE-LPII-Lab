const express = require("express")
const mongoose = require("mongoose")
const Noterouter = require("./router")
const path = require('path')

const app = express()

app.use("/note", Noterouter)

app.get("/", (req, res) => {
    res.send("<h1> Hello world </h1>")
})

mongoose.connect("mongodb://localhost:27017/newcrud")

app.listen(3000, () => {
    console.log("Server is running")
})
const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));


mongoose.connect("mongodb://localhost/crud-self", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then (() => {
    console.log("Connected to mongodb")
}).catch(() => {
    console.log("Could not connect to mongodb")
})

const TodoSchema = new mongoose.Schema({
    title: String,
    desc: String
})

const Todos = mongoose.model("todos", TodoSchema)

// get all
app.get("/todos", async (req, res) => {
    try {
        const todos = await Todos.find();
        res.json(todos)
    } catch (error) {
        res.json("Could not get")
        console.log(error)
    }
})

app.post("/todos", (req, res) => {
    try {
        const [title, desc] = req.body;
        const newTodo = new Todos({
            title: title,
            desc: desc
        })
        newTodo.save();
        res.json(newTodo)
    }  catch {
        res.json("Could not create")
    }
})

app.put("/todos/:id", (req, res) => {
    try {
        const todo = Todos.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            desc: req.body.desc
        })
        res.json(newTodo)
    }  catch {
        res.json("Could not update")
    }
})

app.delete("/todos/:id", (req, res) => {
    try {
        const todo = Todos.findByIdAndDelete(req.params.id)
        res.json("deleted")
    }  catch {
        res.json("Could not update")
    }
})

app.use(express.static("public"))


app.listen(3000, () => {
    console.log("Server is running on port 3000")
})
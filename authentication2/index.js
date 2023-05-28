const express = require("express")
const bodyParser = require("body-parser")
const session = require("express-session")

const app = express()

const users = []

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(session({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true
}))

function isAuthenticated (req, res, next) {
    if (req.session.isAuthenticated) {
        return next()
    } else {
        res.redirect("/login")
    }
}

app.get("/register", (req, res) => {
    res.sendFile(__dirname + "/register.html")
})

app.post("/register", (req, res) => {
    const {username, password} = req.body;

    const newUser = {
        id: users.length + 1,
        username: username,
        password: password
    }
    users.push(newUser)
    // res.send("Success")
    req.session.isAuthenticated = true
    res.redirect("/dashboard")
})

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/login.html")
})

app.post("/login", (req, res) => {
    const {username, password} = req.body;

    const user = users.find(user => user.username === username && user.password === password)
    if (user) {
        // res.send("Success")
        req.session.isAuthenticated = true;
        res.redirect("/dashboard")
    } else {
        res.send("Error")
    }
})

app.get("/dashboard", (req, res) => {
    res.sendFile(__dirname + "/dashboard.html")
})

app.get("/logout", (req, res)  => {
    req.session.destroy();
    res.redirect("/login")
})

app.listen(3000, () => {
    console.log("Server is running")
})
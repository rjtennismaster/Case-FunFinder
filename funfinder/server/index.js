//make sure to 'npm install express', 'npm install body-parser'
//'npm install mysql', 'npm install nodemon'

const express = require("express")
const app = express()

app.get("/", (req, res) => {
    res.send("hello world")
})


app.listen(3001, () => {
    console.log("running on port 3001")
})
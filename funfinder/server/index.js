//make sure to 'npm install express', 'npm install body-parser'
//'npm install mysql', 'npm install nodemon', 'npm install cors',
//np install axios

const express = require("express")
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

const database = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "Exexxexex2*",
    database: "case_funfinder"
})

app.post('/signup', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const firstName = req.body.firstName
    const lastName = req.body.lastName

    database.query(
        "INSERT INTO users (cwru_id, password, first_name, last_name) VALUES (?,?,?,?)",
        [username, password, firstName, lastName],
        (err, result) => {
            if (err) {
                res.send({message: "Signup Failed"})
                console.log(err)
            } else {
                res.send({message: "You're All Signed Up!"})
            }
        }
    )
})

app.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    database.query(
        "SELECT * FROM users WHERE cwru_id = ? AND password = ?",
        [username, password], 
        (err, result) => {
            if (err) {
            res.send({err: err})
            }
            if (result.length > 0) {
                res.send(result)
            } else {
                res.send({message: "You entered the wrong username/password combination!"})
            }
        }
    )
})


app.listen(3003, () => {
    console.log("running on port 3003")
})
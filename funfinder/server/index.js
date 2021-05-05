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

app.post('/addToFunFolder', (req, res) => {
    const cwruId = req.body.cwruId
    const funId = req.body.funId
    const name = req.body.name

    database.query(
        "INSERT INTO is_tracking (cwru_id, fun_id, attraction_name) VALUES (?, ?, ?)",
        [cwruId, funId, name],
        (err, result) => {
            if (err) {
                res.send({message: "You cannot add any more attractions to your fun folder."})
                console.log(err)
            } else {
                res.send({message: "Restaurant Added to Fun Folder!"})
            }
        }
    )
})

app.post('/addToFavorites', (req, res) => {
    const cwruId = req.body.username
    const funId = req.body.fun_id
    const name = req.body.name

    database.query(
        "INSERT INTO is_favorite (fun_id, cwru_id, attraction_name) VALUES (?, ?, ?)",
        [funId, cwruId, name],
        (err, result) => {
            if (err) {
                res.send({message: "You cannot add any more attractions to your favorite."})
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
})

app.get('/getRestaurantsGeneral', (req, res) => {
    const city = req.query.city
    const openingHour = req.query.openingHour
    const closingHour = req.query.closingHour
    const maskRequired = req.query.maskRequired
    const rating = req.query.rating

    database.query(
        "SELECT * FROM restaurants R NATURAL JOIN attractions A WHERE A.city = ? AND A.opening_hour >= ? AND A.closing_hour <= ? AND A.mask_required = ? AND A.rating >= ?",
        [city, openingHour, closingHour, maskRequired, rating],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
})

app.get('/getFunFolder', (req, res) => {
    const username = req.query.username

    database.query(
        "SELECT * FROM is_tracking WHERE cwru_id = ?",
        username,
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
})

app.get('/getFavorites', (req, res) => {
    const username = req.query.username

    database.query(
        "SELECT * FROM is_favorite WHERE cwru_id = ?",
        username,
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
})

app.get('/getAttractionInfo', (req, res) => {
    const funId = req.query.funId

    database.query(
        "SELECT * FROM attractions WHERE fun_id = ?",
        funId,
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
})

app.get('/getAllRestaurants', (req, res) => {

    database.query(
        "SELECT * FROM attractions A NATURAL JOIN restaurants R",  
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
})

app.get('/getRestaurantByName', (req, res) => {
    const rName = req.query.rName

    database.query(
        "SELECT * FROM attractions A NATURAL JOIN restaurants R WHERE R.rname = ?",
        rName,  
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
})

app.get('/findVegetarian', (req, res) => {

    database.query(
        "SELECT * FROM attractions A NATURAL JOIN restaurants R WHERE R.vegetarian_options = 'Y'",
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
})

app.delete('/removeAttraction/:username/:fun', (req, res) => {
    const username = req.params.username
    const funId = req.params.fun

    database.query("DELETE FROM is_tracking WHERE cwru_id = ? AND fun_id = ?",
    [username, funId], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    }
    )
})

app.delete('/removeFromFavorites/:username/:funId', (req, res) => {
    const username = req.params.username
    const funId = req.params.fun

    database.query("DELETE FROM is_favorite WHERE cwru_id = ? AND fun_id = ?",
    [username, funId], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    }
    )
})

app.listen(3003, () => {
    console.log("running on port 3003")
})
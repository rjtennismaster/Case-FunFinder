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

app.get('/findVegan', (req, res) => {

    database.query(
        "SELECT * FROM attractions A NATURAL JOIN restaurants R WHERE R.vegan_options = 'Y'",
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
})

app.get('/getRestaurantsByZipCode', (req, res) => {
    const rZipcode = req.query.rZipcode

    database.query(
        "SELECT * FROM attractions A NATURAL JOIN restaurants R WHERE A.zip_code = ?",
        rZipcode,
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
})

app.get('/findEventfulRestaurants', (req, res) => {

    database.query(
        `SELECT A1.fun_id AS fun, A1.attraction_name, A1.street_address, A1.city, A1.zip_code, A1.opening_hour,
         A1.closing_hour, A1.mask_required, A1.rating, E.ename, E.opening_date, E.closing_date, A2.opening_hour AS eventOpening, 
         A2.closing_hour AS eventClosing, E.is_recurring FROM attractions A1, hosts H, events E, attractions A2 WHERE E.fun_id = H.event_being_hosted_fun_id 
         AND A1.fun_id = H.host_fun_id AND E.fun_id = A2.fun_id AND A1.attraction_type = 'restaurant'`,
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
})

app.get('/getTheatresGeneral', (req, res) => {
    const city = req.query.city
    const maskRequired = req.query.maskRequired
    const rating = req.query.rating
    const popcorn = req.query.popcorn
    const capacity = req.query.capacity

    database.query(
        `SELECT * FROM attractions A NATURAL JOIN theatres T WHERE A.city = ? AND A.mask_required = ? 
        AND A.rating >= ? AND T.sells_popcorn = ? AND T.number_seats >= ?`,
        [city, maskRequired, rating, popcorn, capacity],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
})

app.get('/getAllTheatres', (req, res) => {

    database.query(
        "SELECT * FROM attractions A NATURAL JOIN theatres T",
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
})

app.get('/getTheatreByName', (req, res) => {
    const name = req.query.name

    database.query(
        "SELECT * FROM attractions A NATURAL JOIN theatres T WHERE T.tname = ?",
        name,  
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
})

app.get('/getTheatresByZipCode', (req, res) => {
    const zipcode = req.query.tZipcode

    database.query(
        "SELECT * FROM attractions A NATURAL JOIN theatres T WHERE A.zip_code = ?",
        zipcode,  
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
})

app.get('/findPopcornSellers', (req, res) => {

    database.query(
        "SELECT * FROM attractions A NATURAL JOIN theatres T WHERE T.sells_popcorn = 'Y'",
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
})

app.get('/findEventfulTheatres', (req, res) => {

    database.query(
        `SELECT A1.fun_id AS fun, A1.attraction_name, A1.street_address, A1.city, A1.zip_code,
         A1.mask_required, A1.rating, E.ename, E.opening_date, E.closing_date, A2.opening_hour AS eventOpening, 
         A2.closing_hour AS eventClosing, E.is_recurring FROM attractions A1, hosts H, events E, attractions A2 WHERE E.fun_id = H.event_being_hosted_fun_id 
         AND A1.fun_id = H.host_fun_id AND E.fun_id = A2.fun_id AND A1.attraction_type = 'theatre'`,
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
})

app.get('/getMGeneral', (req, res) => {
    const city = req.query.city
    const openingHour = req.query.openingHour
    const closingHour = req.query.closingHour
    const maskRequired = req.query.maskRequired
    const rating = req.query.rating

    database.query(
        "SELECT * FROM museums_historical M NATURAL JOIN attractions A WHERE A.city = ? AND A.opening_hour >= ? AND A.closing_hour <= ? AND A.mask_required = ? AND A.rating >= ?",
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

app.get('/getAllM', (req, res) => {
    database.query(
        "SELECT * FROM attractions A NATURAL JOIN museums_historical M",
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
})

app.get('/getMByName', (req, res) => {
    const name = req.query.name

    database.query(
        "SELECT * FROM attractions A NATURAL JOIN museums_historical M WHERE M.mhname = ?",
        name,  
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
})

app.get('/findMWithFood', (req, res) => {
    
    database.query(
        "SELECT * FROM attractions A NATURAL JOIN museums_historical M WHERE M.has_food_court = 'Y'",
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
})

app.get('/getMByZipCode', (req, res) => {
    const mZipcode = req.query.mZipcode

    database.query(
        "SELECT * FROM attractions A NATURAL JOIN museums_historical M WHERE A.zip_code = ?",
        mZipcode,  
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
})

app.get('/findEventfulM', (req, res) => {

    database.query(
        `SELECT A1.fun_id AS fun, A1.attraction_name, A1.street_address, A1.city, A1.zip_code, A1.opening_hour,
         A1.closing_hour, A1.mask_required, A1.rating, E.ename, E.opening_date, E.closing_date, A2.opening_hour AS eventOpening, 
         A2.closing_hour AS eventClosing, E.is_recurring FROM attractions A1, hosts H, events E, attractions A2 WHERE E.fun_id = H.event_being_hosted_fun_id 
         AND A1.fun_id = H.host_fun_id AND E.fun_id = A2.fun_id AND A1.attraction_type = 'museum/historical site'`,
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
})

app.get('/getPGeneral', (req, res) => {
    const city = req.query.city
    const maskRequired = req.query.maskRequired
    const rating = req.query.rating
    const acres = req.query.acres

    database.query(
        `SELECT * FROM attractions A NATURAL JOIN parks P WHERE A.city = ? AND A.mask_required = ? 
        AND A.rating >= ? AND P.acre_count >= ?`,
        [city, maskRequired, rating, acres],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
})

app.get('/getAllP', (req, res) => {
    database.query(
        "SELECT * FROM attractions A NATURAL JOIN parks P",
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
})

app.get('/getPByName', (req, res) => {
    const name = req.query.name

    database.query(
        "SELECT * FROM attractions A NATURAL JOIN parks P WHERE P.pname = ?",
        name,  
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
})

app.get('/getPByZipCode', (req, res) => {
    const pZipcode = req.query.pZipcode

    database.query(
        "SELECT * FROM attractions A NATURAL JOIN parks P WHERE A.zip_code = ?",
        pZipcode,  
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
})

app.get('/pWPetArea', (req, res) => {

    database.query(
        "SELECT * FROM attractions A NATURAL JOIN parks P WHERE P.has_pet_area = 'Y'",
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
})

app.get('/pWTennis', (req, res) => {

    database.query(
        "SELECT * FROM attractions A NATURAL JOIN parks P WHERE P.has_tennis_courts = 'Y'",
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
})

app.get('/pWVolleyball', (req, res) => {

    database.query(
        "SELECT * FROM attractions A NATURAL JOIN parks P WHERE P.has_volleyball_net = 'Y'",
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
})

app.get('/pWDuckPond', (req, res) => {

    database.query(
        "SELECT * FROM attractions A NATURAL JOIN parks P WHERE P.has_duck_pond = 'Y'",
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

app.get('/findEventfulP', (req, res) => {

    database.query(
        `SELECT A1.fun_id AS fun, A1.attraction_name, A1.street_address, A1.city, A1.zip_code,
         A1.mask_required, A1.rating, E.ename, E.opening_date, E.closing_date, A2.opening_hour AS eventOpening, 
         A2.closing_hour AS eventClosing, E.is_recurring FROM attractions A1, hosts H, events E, attractions A2 WHERE E.fun_id = H.event_being_hosted_fun_id 
         AND A1.fun_id = H.host_fun_id AND E.fun_id = A2.fun_id AND A1.attraction_type = 'park'`,
        (err, result) => {
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
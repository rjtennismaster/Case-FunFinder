import React, { useState } from "react"
import NavBar from "./Navbar"
import Axios from "axios"
import { Form } from "react-bootstrap"


function TheatreSearch( {username, setUsername, password, 
  setPassword, setLoginStatus, 
  firstName, setFirstName, lastName, setLastName,
  setShowWelcomeModal } ) {

    const [successfulAdd, setSuccessfulAdd] = useState("")

    //state for search parameters
    const [tCity, setTCity] = useState("")
    const [tZipcode, setTZipCode] = useState("")
    const [tMaskReq, setTMaskReq] = useState("")
    const [tNumberSeats, setTNumberSeats] = useState(0)
    const [tPopcorn, setTPopcorn] = useState("")
    const [tName, setTName] = useState("")
    const [tRating, setTRating] = useState("")

    //restaurants results lists
    const [tResultsGeneral, setTResultsGeneral] = useState([])
    const [tEventResults, setTEventResults] = useState([])

    const getTheatresGeneral = (event) => {
      console.log("it's working at least")
      event.preventDefault()
      Axios.get("http://localhost:3003/getTheatresGeneral", {
            params: {
                city: tCity,
                maskRequired: tMaskReq,
                rating: parseFloat(tRating),
                capacity: tNumberSeats,
                popcorn: tPopcorn
            }
        }).then((response) => {
            setTResultsGeneral(response.data.map((theatre) => {
              console.log(response.data)
              return theatre
            }))
        })
    }

    const getAllTheatres = (event) => {
      console.log("it's working at least")
      event.preventDefault()
      Axios.get("http://localhost:3003/getAllTheatres")
        .then((response) => {
            setTResultsGeneral(response.data.map((theatre) => {
              console.log(response.data)
              return theatre
            }))
        })
    }

    const getTheatreByName = (event) => {
      console.log("it's working at least")
      event.preventDefault()
      Axios.get("http://localhost:3003/getTheatreByName", {
        params: {
          name: tName
        }
      }).then((response) => {
            setTResultsGeneral(response.data.map((theatre) => {
              console.log(response.data)
              return theatre
            }))
        })
    }

    const getTheatresByZipCode = (event) => {
        console.log("it's working at least")
        event.preventDefault()
        Axios.get("http://localhost:3003/getTheatresByZipCode", {
          params: {
            tZipcode: tZipcode
          }
        }).then((response) => {
              setTResultsGeneral(response.data.map((theatre) => {
                console.log(response.data)
                return theatre
              }))
          })
      }

    const findPopcornSellers = (event) => {
      console.log("it's working at least")
      event.preventDefault()
      Axios.get("http://localhost:3003/findPopcornSellers")
        .then((response) => {
            setTResultsGeneral(response.data.map((theatre) => {
              console.log(response.data)
              return theatre
            }))
        })
    }

    const findEventfulTheatres = (event) => {
      console.log("it's working at least")
      event.preventDefault()
      Axios.get("http://localhost:3003/findEventfulTheatres")
      .then((response) => {
        setTEventResults(response.data.map((theatre) => {
          console.log(response.data)
          return theatre
        }))
      })
    }

    const addToFunFolder = (event) => {
      Axios.post("http://localhost:3003/addToFunFolder", {
        cwruId: username,
        funId: event.currentTarget.dataset.funid,
        name: event.currentTarget.dataset.name
      }).then((response) => {
        setSuccessfulAdd(response.data.message)
        setTimeout(() => {
          setSuccessfulAdd("")
        }, 2000)
      })
    }

    return (
      <div>
        <NavBar
          username = {username}
          password = {password}
          setLoginStatus = {setLoginStatus}
          setUsername = {setUsername}
          setPassword = {setPassword}
          firstName = {firstName}
          lastName = {lastName}
          setFirstName = {setFirstName}
          setLastName = {setLastName}
          setShowWelcomeModal = {setShowWelcomeModal}
        />

        <div className = "pageContainer">
          <div className = "searchTitleContainer">
            <h1 className = "searchHeader">Search Theatres</h1>
          </div>
        <Form className = "container" onSubmit = {(event) => getTheatresGeneral(event)}>
          
          <span>Show me Theatres in </span>
          <select value = {tCity} 
                  onChange = {(event) => setTCity(event.target.value)}
                  name = "tgencity"
          >
            <option>Select a City</option>
            <option value = "Cleveland">Cleveland</option>
            <option value = "Brooklyn">Brooklyn</option>
          </select>
          <span> that can hold at least </span>
          <select value = {tNumberSeats}
                  onChange = {(event) => setTNumberSeats(event.target.value)}
                  name = "tgenNumSeats"
          >
            <option>Select a Capacity</option>
            <option value = "250">250</option>
            <option value = "500">500</option>
            <option value = "100">1000</option>
            <option value = "2000">2000</option>
            <option value = "5000">5000</option>
            <option value = "10000">10000</option>
          </select>
          <span> people and they </span>
          <select value = {tPopcorn} 
                  onChange = {(event) => setTPopcorn(event.target.value)}
                  name = "tgenpopcorn"
          >
            <option>Choose a Popcorn Option</option>
            <option value = "Y">should</option>
            <option value = "N">should not</option>
          </select>
          <span> sell popcorn. Their mask requirement should be </span>
          <select value = {tMaskReq} 
                  onChange = {(event) => setTMaskReq(event.target.value)}
                  name = "tgenmaskreq"
          >
            <option>Select a Mask Requirement</option>
            <option value = "Y">Requires Mask</option>
            <option value = "N">Does not Require Mask</option>
          </select>
          <span>, and their rating should be at least </span>
          <select value = {tRating} 
                  onChange = {(event) => setTRating(event.target.value)}
                  name = "tgenrating"
          >
            <option>Select a Rating</option>
            <option value = "1.0">1</option>
            <option value = "2.0">2</option>
            <option value = "3.0">3</option>
            <option value = "4.0">4</option>
            <option value = "5.0">5</option>
          </select>
          <span> out of 5 stars.</span>
          <br/>
          <button type = "submit">Find Theatres</button>
        </Form>

        <br/>
        <Form className = "container" onSubmit = {(event) => getAllTheatres(event)}>
          <span>Show me All the Theatres!</span>
          <br/>
          <button type = "submit">Find Theatres</button>
        </Form>
        
        <br/>
        

        <Form className = "container" onSubmit = {(event) => getTheatreByName(event)}>
    
            <span>Search by Name:</span>
            <br/>
            <input
              type = "text"
              value = {tName}
              onChange = {(event) => setTName(event.target.value)}
              placeholder = "Enter a Theatre Name..."
            />
            <br/>
          <button type = "submit">Find Theatres</button>
        </Form>

        <br/>
        <Form className = "container" onSubmit = {getTheatresByZipCode}>
            <span>Search by Zip Code:</span>
            <br/>
            <input
              type = "text"
              value = {tZipcode}
              onChange = {(event) => setTZipCode(event.target.value)}
              placeholder = "Enter a Zip Code..."
            />
            <br/>
          <button type = "submit">Find Theatres</button>
        </Form>

        <br/>

        <Form className = "container" onSubmit = {findPopcornSellers}>
            <span>Show me Theatres that Sell Popcorn.</span>
            <br/>
          <button type = "submit">Find Theatres</button>
        </Form>
        <br/>
        <Form className = "container" onSubmit = {findEventfulTheatres}>
          <span>Which Theatres are hosting events? Show Me a Short Synposis of the Event Information.</span>
          <br/>
          <button type = "submit">Find Theatres</button>
        </Form>
        <div className = "resultsContainer">
          <h3>Results</h3>
          <button 
            onClick = {() => {
              setTResultsGeneral([])
              setTEventResults([])
            }}>
              Clear Results
          </button>
          <h6>{successfulAdd}</h6>
          {tResultsGeneral.map((theatre, index) => {
            return (
              <div
                className = "resultCard"
                key = {index}
              >
                <h4>{theatre.tname}</h4>
                <ul>
                  <li>Location: {theatre.street_address} {theatre.city}, OH {theatre.zip_code}</li>
                  <li>Capacity Limit: {theatre.number_seats}</li>
                  <li>Do I Need to Wear a Mask? {theatre.mask_required}</li>
                  <li>Will popcorn be sold? {theatre.sells_popcorn}</li>
                  <li>Top Program Showing: {theatre.top_program_showing}</li>
                  <li>Rating Out of 5: {theatre.rating}</li>
                </ul>
                <button 
                  key = {index}
                  onClick = {(event) => addToFunFolder(event)}
                  data-funid = {theatre.fun_id}
                  data-name = {theatre.attraction_name}>
                    Add to your Fun Folder!
                </button>
              </div>
            )
          })}
          {tEventResults.map((theatre, index) => {
            return (
              <div
                className = "resultCard"
                key = {index}
              >
                <h4>{theatre.attraction_name}</h4>
                <ul>
                  <li>Location: {theatre.street_address} {theatre.city}, OH {theatre.zip_code}</li>
                  <li>Do I Need to Wear a Mask? {theatre.mask_required}</li>
                  <li>Rating Out of 5: {theatre.rating}</li>
                </ul>
              
                <h6>{theatre.attraction_name} is hosting "{theatre.ename}" - {theatre.synopsis}</h6>
                <ul>
                  <li>When? {theatre.opening_date} to {theatre.closing_date}</li>
                  <li>At what Time? From {theatre.eventOpening} to {theatre.eventClosing}</li>
                  <li>Will this event ever happen again? {theatre.is_recurring}</li>
                </ul>
                <button 
                  key = {index + 1} 
                  onClick = {(event) => addToFunFolder(event)}
                  data-funid = {theatre.fun}
                  data-name = {theatre.attraction_name}>
                    Add this Theatre to your Fun Folder!
                </button>
              </div>
            )
          })}
        </div>
        </div>
      </div>
      )
}

export default TheatreSearch
import React, { useState } from "react"
import NavBar from "./Navbar"
import Axios from "axios"
import { Form } from "react-bootstrap"


function ParksSearch( {username, setUsername, password, 
  setPassword, setLoginStatus, 
  firstName, setFirstName, lastName, setLastName,
  setShowWelcomeModal } ) {

    const [successfulAdd, setSuccessfulAdd] = useState("")

    //state for search parameters
    const [pCity, setPCity] = useState("")
    const [pZipcode, setPZipCode] = useState("")
    const [pMaskReq, setPMaskReq] = useState("")
    const [pAcres, setPAcres] = useState(0)
    const [pName, setPName] = useState("")
    const [pRating, setPRating] = useState("")

    //restaurants results lists
    const [pResultsGeneral, setPResultsGeneral] = useState([])
    const [pEventResults, setPEventResults] = useState([])

    const getPGeneral = (event) => {
      console.log("it's working at least")
      event.preventDefault()
      Axios.get("http://localhost:3003/getPGeneral", {
            params: {
                city: pCity,
                maskRequired: pMaskReq,
                rating: parseFloat(pRating),
                acres: pAcres
            }
        }).then((response) => {
            setPResultsGeneral(response.data.map((park) => {
              console.log(response.data)
              return park
            }))
        })
    }

    const getAllP = (event) => {
      console.log("it's working at least")
      event.preventDefault()
      Axios.get("http://localhost:3003/getAllP")
        .then((response) => {
            setPResultsGeneral(response.data.map((park) => {
              console.log(response.data)
              return park
            }))
        })
    }

    const getPByName = (event) => {
      console.log("it's working at least")
      event.preventDefault()
      Axios.get("http://localhost:3003/getPByName", {
        params: {
          name: pName
        }
      }).then((response) => {
            setPResultsGeneral(response.data.map((park) => {
              console.log(response.data)
              return park
            }))
        })
    }

    const getPByZipCode = (event) => {
        console.log("it's working at least")
        event.preventDefault()
        Axios.get("http://localhost:3003/getPByZipCode", {
          params: {
            pZipcode: pZipcode
          }
        }).then((response) => {
              setPResultsGeneral(response.data.map((park) => {
                console.log(response.data)
                return park
              }))
          })
      }

    const pWPetArea = (event) => {
        console.log("it's working at least")
        event.preventDefault()
        Axios.get("http://localhost:3003/pWPetArea")
            .then((response) => {
                setPResultsGeneral(response.data.map((park) => {
                console.log(response.data)
                return park
                }))
            })
    }

    const pWTennis = (event) => {
        console.log("it's working at least")
        event.preventDefault()
        Axios.get("http://localhost:3003/pWTennis")
          .then((response) => {
              setPResultsGeneral(response.data.map((park) => {
                console.log(response.data)
                return park
              }))
          })
      }

    const pWVolleyball = (event) => {
        console.log("it's working at least")
        event.preventDefault()
        Axios.get("http://localhost:3003/pWVolleyball")
            .then((response) => {
                setPResultsGeneral(response.data.map((park) => {
                console.log(response.data)
                return park
                }))
            })
    }

    const pWDuckPond = (event) => {
        console.log("it's working at least")
        event.preventDefault()
        Axios.get("http://localhost:3003/pWDuckPond")
          .then((response) => {
              setPResultsGeneral(response.data.map((park) => {
                console.log(response.data)
                return park
              }))
          })
    }

    const findEventfulP = (event) => {
        console.log("it's working at least")
        event.preventDefault()
        Axios.get("http://localhost:3003/findEventfulP")
        .then((response) => {
            setPEventResults(response.data.map((park) => {
            console.log(response.data)
            return park
            }))
        })
    }

    const addToFunFolder = (event) => {
      Axios.post("http://localhost:3003/addToFunFolder", {
        cwruId: username,
        funId: event.currentTarget.dataset.funId,
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

        <h1>Search Parks</h1>
        <Form className = "container" onSubmit = {(event) => getPGeneral(event)}>
          
          <span>Show me Parks in </span>
          <select value = {pCity} 
                  onChange = {(event) => setPCity(event.target.value)}
                  name = "pgencity"
          >
            <option>Select a City</option>
            <option value = "Cleveland">Cleveland</option>
            <option value = "Brooklyn">Brooklyn</option>
          </select>
          <span> are at least at least </span>
          <select value = {pAcres}
                  onChange = {(event) => setPAcres(event.target.value)}
                  name = "pacres"
          >
            <option>Select an Acre Count</option>
            <option value = "1">1</option>
            <option value = "5">5</option>
            <option value = "10">10</option>
            <option value = "50">50</option>
            <option value = "100">100</option>
            <option value = "200">200</option>
          </select>
          <span> acres large. </span>
          <span> Their mask requirement should be </span>
          <select value = {pMaskReq} 
                  onChange = {(event) => setPMaskReq(event.target.value)}
                  name = "pgenmaskreq"
          >
            <option>Select a Mask Requirement</option>
            <option value = "Y">Requires Mask</option>
            <option value = "N">Does not Require Mask</option>
          </select>
          <span>, and their rating should be at least </span>
          <select value = {pRating} 
                  onChange = {(event) => setPRating(event.target.value)}
                  name = "pgenrating"
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
          <button type = "submit">Find Parks</button>
        </Form>

        <br/>
        <Form className = "container" onSubmit = {(event) => getAllP(event)}>
          <span>Show me All the Parks!</span>
          <br/>
          <button type = "submit">Find Parks</button>
        </Form>
        
        <br/>
        

        <Form className = "container" onSubmit = {(event) => getPByName(event)}>
    
            <span>Search by Name:</span>
            <br/>
            <input
              type = "text"
              value = {pName}
              onChange = {(event) => setPName(event.target.value)}
              placeholder = "Enter a Park Name..."
            />
            <br/>
          <button type = "submit">Find Parks</button>
        </Form>

        <br/>
        <Form className = "container" onSubmit = {getPByZipCode}>
            <span>Search by Zip Code:</span>
            <br/>
            <input
              type = "text"
              value = {pZipcode}
              onChange = {(event) => setPZipCode(event.target.value)}
              placeholder = "Enter a Zip Code..."
            />
            <br/>
          <button type = "submit">Find Parks</button>
        </Form>

        <br/>

        <Form className = "container" onSubmit = {pWPetArea}>
            <span>Show me Parks that have a Pet Area.</span>
            <br/>
          <button type = "submit">Find Parks</button>
        </Form>
        <br/>

        <Form className = "container" onSubmit = {pWTennis}>
            <span>Show me Parks that have Tennis Courts.</span>
            <br/>
          <button type = "submit">Find Parks</button>
        </Form>
        <br/>
        <Form className = "container" onSubmit = {pWVolleyball}>
            <span>Show me Parks that have a Volleyball Court.</span>
            <br/>
          <button type = "submit">Find Parks</button>
        </Form>
        <br/>
        <Form className = "container" onSubmit = {pWDuckPond}>
            <span>Show me Parks that have a Duck Pond.</span>
            <br/>
          <button type = "submit">Find Parks</button>
        </Form>
        <br/>
        <Form className = "container" onSubmit = {findEventfulP}>
          <span>Which Parks are hosting events? Show Me a Short Synposis of the Event Information.</span>
          <br/>
          <button type = "submit">Find Parks</button>
        </Form>
        <div className = "resultsContainer">
          <h3>Results</h3>
          <button 
            onClick = {() => {
              setPResultsGeneral([])
              setPEventResults([])
            }}>
              Clear Results
          </button>
          <h6>{successfulAdd}</h6>
          {pResultsGeneral.map((park, index) => {
            return (
              <div
                className = "resultCard"
                key = {index}
              >
                <h4>{park.pname}</h4>
                <ul>
                  <li>Location: {park.street_address} {park.city}, OH {park.zip_code}</li>
                  <li>Acre Count: {park.acre_count}</li>
                  <li>Is there a Pet Area? {park.has_pet_area}</li>
                  <li>Are there Tennis Courts? {park.has_tennis_courts}</li>
                  <li>Is there a Volleyball Net? {park.has_volleyball_net}</li>
                  <li>Is there a Duck Pond? {park.has_duck_pond}</li>
                  <li>Do I Need to Wear a Mask? {park.mask_required}</li>
                  <li>Rating Out of 5: {park.rating}</li>
                </ul>
                <button 
                  key = {index}
                  onClick = {(event) => addToFunFolder(event)}
                  data-funId = {park.fun_id}
                  data-name = {park.attraction_name}>
                    Add to your Fun Folder!
                </button>
              </div>
            )
          })}
          {pEventResults.map((park, index) => {
            return (
              <div
                className = "resultCard"
                key = {index}
              >
                <h4>{park.attraction_name}</h4>
                <ul>
                  <li>Location: {park.street_address} {park.city}, OH {park.zip_code}</li>
                  <li>Do I Need to Wear a Mask? {park.mask_required}</li>
                  <li>Rating Out of 5: {park.rating}</li>
                </ul>
              
                <h6>{park.attraction_name} is hosting {park.ename}</h6>
                <ul>
                  <li>When? {park.opening_date} to {park.closing_date}</li>
                  <li>At what Time? From {park.eventOpening} to {park.eventClosing}</li>
                  <li>Will this event ever happen again? {park.is_recurring}</li>
                </ul>
                <button 
                  key = {index} 
                  onClick = {(event) => addToFunFolder(event)}
                  data-funId = {park.fun}
                  data-name = {park.attraction_name}>
                    Add this Park to your Fun Folder!
                </button>
              </div>
            )
          })}
        </div>
      </div>
      )
}

export default ParksSearch
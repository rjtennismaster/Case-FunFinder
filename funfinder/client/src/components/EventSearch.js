import React, { useState } from "react"
import NavBar from "./Navbar"
import Axios from "axios"
import { Form } from "react-bootstrap"


function EventSearch( {username, setUsername, password, 
  setPassword, setLoginStatus, 
  firstName, setFirstName, lastName, setLastName,
  setShowWelcomeModal } ) {

    const [successfulAdd, setSuccessfulAdd] = useState("")

    //state for search parameters
    const [eCity, setECity] = useState("")
    const [eZipcode, setEZipCode] = useState("")
    const [eOpening, setEOpening] = useState("")
    const [eClosing, setEClosing] = useState("")
    const [eMaskReq, setEMaskReq] = useState("")
    const [eName, setEName] = useState("")
    const [isRecurring, setIsRecurring] = useState("")

    //restaurants results lists
    const [eResultsGeneral, setEResultsGeneral] = useState([])

    const getEGeneral = (event) => {
      console.log("it's working at least")
      event.preventDefault()
      Axios.get("http://localhost:3003/getEGeneral", {
            params: {
                city: eCity,
                openingHour: parseInt(eOpening),
                closingHour: parseInt(eClosing),
                maskRequired: eMaskReq,
                isRecurring: isRecurring
            }
        }).then((response) => {
            setEResultsGeneral(response.data.map((e) => {
              console.log(response.data)
              return e
            }))
        })
    }

    const getAllE = (event) => {
      console.log("it's working at least")
      event.preventDefault()
      Axios.get("http://localhost:3003/getAllE")
        .then((response) => {
            setEResultsGeneral(response.data.map((e) => {
              console.log(response.data)
              return e
            }))
        })
    }

    const getEByName = (event) => {
      console.log("it's working at least")
      event.preventDefault()
      Axios.get("http://localhost:3003/getEByName", {
        params: {
          eName: eName
        }
      }).then((response) => {
            setEResultsGeneral(response.data.map((e) => {
              console.log(response.data)
              return e
            }))
        })
    }

    const getEByZipCode = (event) => {
      console.log("it's working at least")
      event.preventDefault()
      Axios.get("http://localhost:3003/getEByZipCode", {
        params: {
          eZipcode: eZipcode
        }
      }).then((response) => {
            setEResultsGeneral(response.data.map((e) => {
              console.log(response.data)
              return e
            }))
        })
    }

    const eChildFriendly = (event) => {
        console.log("it's working at least")
        event.preventDefault()
        Axios.get("http://localhost:3003/eChildFriendly")
          .then((response) => {
              setEResultsGeneral(response.data.map((e) => {
                console.log(response.data)
                return e
              }))
          })
      }
  
    const eMusicRelated = (event) => {
        console.log("it's working at least")
        event.preventDefault()
        Axios.get("http://localhost:3003/eMusicRelated")
            .then((response) => {
                setEResultsGeneral(response.data.map((e) => {
                console.log(response.data)
                return e
                }))
            })
    }

    const eFoodRelated = (event) => {
        console.log("it's working at least")
        event.preventDefault()
        Axios.get("http://localhost:3003/eFoodRelated")
            .then((response) => {
                setEResultsGeneral(response.data.map((e) => {
                console.log(response.data)
                return e
                }))
            })
    }

    const eSportsRelated = (event) => {
        console.log("it's working at least")
        event.preventDefault()
        Axios.get("http://localhost:3003/eSportsRelated")
            .then((response) => {
                setEResultsGeneral(response.data.map((e) => {
                console.log(response.data)
                return e
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
        
        <h1>Search Events</h1>
        <Form className = "container" onSubmit = {(event) => getEGeneral(event)}>
          <span>Show me Events in </span>
          <select value = {eCity} 
                  onChange = {(event) => setECity(event.target.value)}
                  name = "egencity"
          >
            <option>Select a City</option>
            <option value = "Cleveland">Cleveland</option>
            <option value = "Brooklyn">Brooklyn</option>
          </select>
          <span> that take place between the hours of </span>
          <select value = {eOpening}
                  onChange = {(event) => setEOpening(event.target.value)}
                  name = "egenoptime"
          >
            <option>Select an Opening Time</option>
            <option value = "0000">00:00</option>
            <option value = "0100">01:00</option>
            <option value = "0200">02:00</option>
            <option value = "0300">03:00</option>
            <option value = "0400">04:00</option>
            <option value = "0500">05:00</option>
            <option value = "0600">06:00</option>
            <option value = "0700">07:00</option>
            <option value = "0800">08:00</option>
            <option value = "0900">09:00</option>
            <option value = "1000">10:00</option>
            <option value = "1100">11:00</option>
            <option value = "1200">12:00</option>
            <option value = "1300">13:00</option>
            <option value = "1400">14:00</option>
            <option value = "1500">15:00</option>
            <option value = "1600">16:00</option>
            <option value = "1700">17:00</option>
            <option value = "1800">18:00</option>
            <option value = "1900">19:00</option>
            <option value = "2000">20:00</option>
            <option value = "2100">21:00</option>
            <option value = "2200">22:00</option>
            <option value = "2300">23:00</option>
            <option value = "2400">24:00</option>
          </select>
          <span> and </span>
          <select value = {eClosing}
                  onChange = {(event) => setEClosing(event.target.value)}
                  name = "egenclosetime"
          >
            <option>Select a Closing Time</option>
            <option value = "0000">00:00</option>
            <option value = "0100">01:00</option>
            <option value = "0200">02:00</option>
            <option value = "0300">03:00</option>
            <option value = "0400">04:00</option>
            <option value = "0500">05:00</option>
            <option value = "0600">06:00</option>
            <option value = "0700">07:00</option>
            <option value = "0800">08:00</option>
            <option value = "0900">09:00</option>
            <option value = "1000">10:00</option>
            <option value = "1100">11:00</option>
            <option value = "1200">12:00</option>
            <option value = "1300">13:00</option>
            <option value = "1400">14:00</option>
            <option value = "1500">15:00</option>
            <option value = "1600">16:00</option>
            <option value = "1700">17:00</option>
            <option value = "1800">18:00</option>
            <option value = "1900">19:00</option>
            <option value = "2000">20:00</option>
            <option value = "2100">21:00</option>
            <option value = "2200">22:00</option>
            <option value = "2300">23:00</option>
            <option value = "2400">24:00</option>
          </select>
          <span>. Their mask requirement should be </span>
          <select value = {eMaskReq} 
                  onChange = {(event) => setEMaskReq(event.target.value)}
                  name = "egenmaskreq"
          >
            <option>Select a Mask Requirement</option>
            <option value = "Y">Requires Mask</option>
            <option value = "N">Does not Require Mask</option>
          </select>
          <span>, and they should be </span>
          <select value = {isRecurring} 
                  onChange = {(event) => setIsRecurring(event.target.value)}
                  name = "erecurring"
          >
            <option>Select a Frequency</option>
            <option value = "Y">Recurring</option>
            <option value = "N">Non - Recurring</option>
          </select>
          <br/>
          <button type = "submit">Find Events</button>
        </Form>

        <br/>
        <Form className = "container" onSubmit = {(event) => getAllE(event)}>
          <span>Show me All the Events!</span>
          <br/>
          <button type = "submit">Find Events</button>
        </Form>
        
        <br/>
  

        <Form className = "container" onSubmit = {(event) => getEByName(event)}>
          
            <span>Search by Name:</span>
            <br/>
            <input
              type = "text"
              value = {eName}
              onChange = {(event) => setEName(event.target.value)}
              placeholder = "Enter an Event Name..."
            />
            <br/>
          <button type = "submit">Find Events</button>
        </Form>

        <br/>
        <Form className = "container" onSubmit = {getEByZipCode}>
            <span>Search by Zip Code:</span>
            <br/>
            <input
              type = "text"
              value = {eZipcode}
              onChange = {(event) => setEZipCode(event.target.value)}
              placeholder = "Enter a Zip Code..."
            />
            <br/>
          <button type = "submit">Find Events</button>
        </Form>

        <br/>

        <Form className = "container" onSubmit = {eChildFriendly}>
            <span>Show me Child-Friendly Events.</span>
            <br/>
          <button type = "submit">Find Events</button>
        </Form>
        <br/>
        <Form className = "container" onSubmit = {eMusicRelated}>
            <span>Show me Music-Related Events.</span>
            <br/>
          <button type = "submit">Find Events</button>
        </Form>

        <br/>
        <Form className = "container" onSubmit = {eFoodRelated}>
          <span>Show me Food-Related Events.</span>
          <br/>
          <button type = "submit">Find Events</button>
        </Form>
        <br/>
        <Form className = "container" onSubmit = {eSportsRelated}>
          <span>Show me Sports-Related Events.</span>
          <br/>
          <button type = "submit">Find Events</button>
        </Form>

        <div className = "resultsContainer">
          <h3>Results</h3>
          <button 
            onClick = {() => {
              setEResultsGeneral([])
            }}>
              Clear Results
          </button>
          <h6>{successfulAdd}</h6>
          {eResultsGeneral.map((e, index) => {
            return (
              <div
                className = "resultCard"
                key = {index}
              >
                <h4>{e.ename}</h4>
                <h6>{e.synopsis}</h6>
                <ul>
                  <li>Location: {e.street_address} {e.city}, OH {e.zip_code}</li>
                  <li>Happening from {e.opening_date} to {e.closing_date}</li>
                  <li>Starts At (Military Time): {e.opening_hour}</li>
                  <li>Ends At (Military Time): {e.closing_hour}</li>
                  <li>Will this Event Happen ever again? {e.is_recurring}</li>
                  <li>Child-Friendly? {e.is_child_friendly}</li>
                  <li>Music-Related? {e.is_music_related}</li>
                  <li>Food-Related? {e.is_food_related}</li>
                  <li>Sports-Related? {e.is_sports_related}</li>
                  <li>Do I Need to Wear a Mask? {e.mask_required}</li>
                </ul>
                <button 
                  key = {index + 1}
                  onClick = {(event) => addToFunFolder(event)}
                  data-funid = {e.fun_id}
                  data-name = {e.attraction_name}
                  >Add to your Fun Folder!
                </button>
              </div>
            )
          })}
        </div>
      </div>
      )
}

export default EventSearch
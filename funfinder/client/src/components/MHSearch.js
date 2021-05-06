import React, { useState } from "react"
import NavBar from "./Navbar"
import Axios from "axios"
import { Form } from "react-bootstrap"

function MHSearch( {username, setUsername, password, 
    setPassword, setLoginStatus, 
    firstName, setFirstName, lastName, setLastName,
    setShowWelcomeModal } ) {
  
      const [successfulAdd, setSuccessfulAdd] = useState("")
  
      //state for search parameters
      const [mCity, setMCity] = useState("")
      const [mZipcode, setMZipCode] = useState("")
      const [mOpening, setMOpening] = useState("")
      const [mClosing, setMClosing] = useState("")
      const [mMaskReq, setMMaskReq] = useState("")
      const [mName, setMName] = useState("")
      const [mRating, setMRating] = useState("")
  
      //restaurants results lists
      const [mResultsGeneral, setMResultsGeneral] = useState([])
      const [mEventResults, setMEventResults] = useState([])
  
      const getMGeneral = (event) => {
        console.log("it's working at least")
        event.preventDefault()
        Axios.get("http://localhost:3003/getMGeneral", {
              params: {
                  city: mCity,
                  openingHour: parseInt(mOpening),
                  closingHour: parseInt(mClosing),
                  maskRequired: mMaskReq,
                  rating: parseFloat(mRating)
              }
          }).then((response) => {
              setMResultsGeneral(response.data.map((museum) => {
                console.log(response.data)
                return museum
              }))
          })
      }
  
      const getAllM = (event) => {
        console.log("it's working at least")
        event.preventDefault()
        Axios.get("http://localhost:3003/getAllM")
          .then((response) => {
              setMResultsGeneral(response.data.map((museum) => {
                console.log(response.data)
                return museum
              }))
          })
      }
  
      const getMByName = (event) => {
        console.log("it's working at least")
        event.preventDefault()
        Axios.get("http://localhost:3003/getMByName", {
          params: {
            name: mName
          }
        }).then((response) => {
              setMResultsGeneral(response.data.map((museum) => {
                console.log(response.data)
                return museum
              }))
          })
      }
  
      const findMWithFood = (event) => {
        console.log("it's working at least")
        event.preventDefault()
        Axios.get("http://localhost:3003/findMWithFood")
          .then((response) => {
              setMResultsGeneral(response.data.map((museum) => {
                console.log(response.data)
                return museum
              }))
          })
      }
  
      const getMByZipCode = (event) => {
        console.log("it's working at least")
        event.preventDefault()
        Axios.get("http://localhost:3003/getMByZipCode", {
          params: {
            mZipcode: mZipcode
          }
        }).then((response) => {
              setMResultsGeneral(response.data.map((museum) => {
                console.log(response.data)
                return museum
              }))
          })
      }
  
      const findEventfulM = (event) => {
        console.log("it's working at least")
        event.preventDefault()
        Axios.get("http://localhost:3003/findEventfulM")
        .then((response) => {
          setMEventResults(response.data.map((museum) => {
            console.log(response.data)
            return museum
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
            <h1 className = "searchHeaderM">Search Museums and Historical Sites</h1>
          </div>
          <Form className = "container" onSubmit = {(event) => getMGeneral(event)}>
            <span>Show me Museums and Historical Sites in </span>
            <select value = {mCity} 
                    onChange = {(event) => setMCity(event.target.value)}
                    name = "mgencity"
            >
              <option>Select a City</option>
              <option value = "Cleveland">Cleveland</option>
            </select>
            <span>that are open between the Hours of </span>
            <select value = {mOpening}
                    onChange = {(event) => setMOpening(event.target.value)}
                    name = "mgenoptime"
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
            <select value = {mClosing}
                    onChange = {(event) => setMClosing(event.target.value)}
                    name = "mgenclosetime"
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
            <span>Their Mask Requirement should be </span>
            <select value = {mMaskReq} 
                    onChange = {(event) => setMMaskReq(event.target.value)}
                    name = "mgenmaskreq"
            >
              <option>Select a Mask Requirement</option>
              <option value = "Y">Requires Mask</option>
              <option value = "N">Does not Require Mask</option>
            </select>
            <span>and their Rating should be at least </span>
            <select value = {mRating} 
                    onChange = {(event) => setMRating(event.target.value)}
                    name = "mgenrating"
            >
              <option>Select a Rating</option>
              <option value = "1.0">1</option>
              <option value = "2.0">2</option>
              <option value = "3.0">3</option>
              <option value = "4.0">4</option>
              <option value = "5.0">5</option>
            </select>
            <span> out of 5 Stars.</span>
            <br/>
            <button type = "submit">Find Museums/Historical Sites</button>
          </Form>
  
          <br/>
          <Form className = "container" onSubmit = {(event) => getAllM(event)}>
            <span>Show me ALL the Museums/Historical Sites!</span>
            <br/>
            <button type = "submit">Find Museums/Historical Sites</button>
          </Form>
          
          <br/>
  
          <Form className = "container" onSubmit = {(event) => getMByName(event)}>
            
              <span>Search by Name:</span>
              <br/>
              <input
                type = "text"
                value = {mName}
                onChange = {(event) => setMName(event.target.value)}
                placeholder = "Enter a Museum/Historical Site name..."
              />
              <br/>
            <button type = "submit">Find Museums/Historical Sites</button>
          </Form>
  
          <br/>
          <Form className = "container" onSubmit = {getMByZipCode}>
              <span>Search by Zip Code:</span>
              <br/>
              <input
                type = "text"
                value = {mZipcode}
                onChange = {(event) => setMZipCode(event.target.value)}
                placeholder = "Enter a Zip Code..."
              />
              <br/>
            <button type = "submit">Find Museums/Historical Sites</button>
          </Form>
          <br/>
          <Form className = "container" onSubmit = {(event) => findMWithFood(event)}>
            <span>Show me the Museums/Historical Sites that have Food Courts.</span>
            <br/>
            <button type = "submit">Find Museums/Historical Sites</button>
          </Form>
          <br/>
          <Form className = "container" onSubmit = {findEventfulM}>
            <span>Which Museums/Historical Sites are hosting Events? Provide me with a short Synposis of the Event Information.</span>
            <br/>
            <button type = "submit">Find Museums/Historical Sites</button>
          </Form>
          <div className = "resultsTitleContainer">
            <h2 className = "resultsHeader">Results</h2>
            <button 
              onClick = {() => {
                setMResultsGeneral([])
                setMEventResults([])
              }}>
                Clear Results
            </button>
          </div>
            <h6>{successfulAdd}</h6>
            {mResultsGeneral.map((museum, index) => {
              return (
                <div
                  className = "resultCard"
                  key = {index}
                >
                  <h4>{museum.mhname}</h4>
                  <ul>
                    <li>Location: {museum.street_address} {museum.city}, OH {museum.zip_code}</li>
                    <li>Opens At (Military Time): {museum.opening_hour}</li>
                    <li>Closes At (Military Time): {museum.closing_hour}</li>
                    <li>Is there a Food Court? {museum.has_food_court}</li>
                    <li>What is the top Exhibit? {museum.top_exhibit}</li>
                    <li>Do I need to wear a Mask? {museum.mask_required}</li>
                    <li>Rating Out of 5: {museum.rating}</li>
                  </ul>
                  <button 
                    key = {index}
                    onClick = {(event) => addToFunFolder(event)}
                    data-funid = {museum.fun_id}
                    data-name = {museum.attraction_name}
                    >Add to your Fun Folder!
                  </button>
                </div>
              )
            })}
            {mEventResults.map((museum, index) => {
              return (
                <div
                  className = "resultCard"
                  key = {index}
                >
                  <h4>{museum.attraction_name}</h4>
                  <ul>
                    <li>Location: {museum.street_address} {museum.city}, OH {museum.zip_code}</li>
                    <li>Opens At (Military Time): {museum.opening_hour}</li>
                    <li>Closes At (Military Time): {museum.closing_hour}</li>
                    <li>Do I need to wear a Mask? {museum.mask_required}</li>
                    <li>Rating Out of 5: {museum.rating}</li>
                  </ul>
                
                  <h6>{museum.attraction_name} is hosting "{museum.ename}" - {museum.synopsis}</h6>
                  <ul>
                    <li>When? {museum.opening_date} to {museum.closing_date}</li>
                    <li>At what Time? From {museum.eventOpening} to {museum.eventClosing}</li>
                    <li>Will this Event ever happen again? {museum.is_recurring}</li>
                  </ul>
                  <button 
                    key = {index + 1}
                    onClick = {(event) => addToFunFolder(event)}
                    data-funid = {museum.fun}
                    data-name = {museum.attraction_name}>
                      Add this Mueseum/Historical Site to your Fun Folder!
                  </button>
                </div>
              )
            })}
          </div>
        </div>
        )
  }
  
  export default MHSearch
import React, { useState } from "react"
import NavBar from "./components/Navbar"
import Axios from "axios"
import { Form } from "react-bootstrap"



function Search( {username, setUsername, password, 
  setPassword, setLoginStatus, 
  firstName, setFirstName, lastName, setLastName,
  setShowWelcomeModal } ) {

    const [successfulAdd, setSuccessfulAdd] = useState("")

    //state for search parameters
    const [rCity, setRCity] = useState("")
    const [rZipcode, setRZipCode] = useState("")
    const [rOpening, setROpening] = useState("")
    const [rClosing, setRClosing] = useState("")
    const [rMaskReq, setRMaskReq] = useState("")
    const [rVegetarian, setRVegetarian] = useState("")
    const [rVegan, setRVegan] = useState("")
    const [rRating, setRRating] = useState("")

    //restaurants results list
    const [rResultsGeneral, setRResultsGeneral] = useState([])


    const getRestaurantsGeneral = (event) => {
      console.log("it's working at least")
      event.preventDefault()
      Axios.get("http://localhost:3003/getRestaurantsGeneral", {
            params: {
                city: rCity,
                openingHour: parseInt(rOpening),
                closingHour: parseInt(rClosing),
                maskRequired: rMaskReq,
                rating: parseFloat(rRating)
            }
        }).then((response) => {
            setRResultsGeneral(response.data.map((restaurant) => {
              console.log(response.data)
              return restaurant
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
        {/*
        <SearchBody />
        */}
        <h1>Search Restaurants</h1>
        <Form className = "container" onSubmit = {(event) => getRestaurantsGeneral(event)}>
          <h3>General Restaurant Search:</h3>
          <span>Show me Restaurants in </span>
          <select value = {rCity} 
                  onChange = {(event) => setRCity(event.target.value)}
                  name = "rgencity"
          >
            <option>Select a City</option>
            <option value = "Cleveland">Cleveland</option>
          </select>
          <span> that are open between the hours of </span>
          <select value = {rOpening}
                  onChange = {(event) => setROpening(event.target.value)}
                  name = "rgenoptime"
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
          <select value = {rClosing}
                  onChange = {(event) => setRClosing(event.target.value)}
                  name = "rgenclosetime"
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
          <select value = {rMaskReq} 
                  onChange = {(event) => setRMaskReq(event.target.value)}
                  name = "rgenmaskreq"
          >
            <option>Select a Mask Requirement</option>
            <option value = "Y">Requires Mask</option>
            <option value = "N">Does not Require Mask</option>
          </select>
          <span>, and their rating should be at least </span>
          <select value = {rRating} 
                  onChange = {(event) => setRRating(event.target.value)}
                  name = "rgenrating"
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
          <button type = "submit">Find Restaurants</button>
        </Form>

        <div className = "resultsContainer">
          {rResultsGeneral.map((restaurant, index) => {
            return (
              <div
                className = "resultCard"
                key = {index}
                data-funId = {restaurant.fun_id}
                data-name = {restaurant.name}
                onClick = {(event) => addToFunFolder(event)}
              >
                <h3>{restaurant.rname}</h3>
                <ul>
                  <li>Owner: {restaurant.owner}</li>
                  <li>Street Address: {restaurant.street_address}</li>
                  <li>City: {restaurant.city}</li>
                  <li>Zip Code: {restaurant.zip_code}</li>
                  <li>Opens At (Military Time): {restaurant.opening_hour}</li>
                  <li>Closes At (Military Time): {restaurant.closing_hour}</li>
                  <li>Are Vegatarian Options Available? {restaurant.vegetarian_options}</li>
                  <li>Are Vegan Options Available? {restaurant.vegan_options}</li>
                  <li>Capacity Limit: {restaurant.capacity_limit}</li>
                  <li>Do I Need to Wear a Mask? {restaurant.mask_required}</li>
                  <li>Rating Out of 5: {restaurant.rating}</li>
                </ul>
                <h6>{successfulAdd}</h6>
              </div>
            )
          })}
        </div>
      </div>
      )
}

export default Search
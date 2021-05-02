import React from "react"
import SearchBody from "./components/SearchBody"
import NavBar from "./components/Navbar"

function Search( {username, setUsername, password, 
  setPassword, setLoginStatus, 
  firstName, setFirstName, lastName, setLastName,
  setShowWelcomeModal } ) {

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
        <SearchBody />
      </div>
    )
}

export default Search
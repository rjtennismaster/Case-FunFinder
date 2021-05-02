import React from "react"
import NavBar from "./Navbar"

function FunFolder( {username, setUsername, password, 
    setPassword, setLoginStatus, setShowWelcomeModal,
    firstName, lastName, setFirstName, setLastName} ) {

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
      </div>
    )
}

export default FunFolder
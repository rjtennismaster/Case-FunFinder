import React from "react"
import NavBar from "./Navbar"

function FunFolder( {username, setUsername, password, 
    setPassword, loginStatus, setLoginStatus,
    showWelcomeModal, setShowWelcomeModal } ) {

    return (
      <div>
        <NavBar
          setUsername = {setUsername}
          setPassword = {setPassword}
          setShowWelcomeModal = {setShowWelcomeModal}
          setLoginStatus = {setLoginStatus} 
        />
      </div>
    )
}

export default FunFolder
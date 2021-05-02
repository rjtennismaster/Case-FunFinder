import React from "react"
import NavBar from "./Navbar"

function FunFolder( {username, setUsername, password, 
    setPassword, loginStatus, setLoginStatus,
    showWelcomeModal, setShowWelcomeModal } ) {
        
    return (
      <div>
        <NavBar />
      </div>
    )
}

export default FunFolder
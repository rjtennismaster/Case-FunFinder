import React from "react"
import SearchBody from "./components/SearchBody"
import NavBar from "./components/Navbar"

function Search( {username, setUsername, password, 
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
        <SearchBody />
      </div>
    )
}

export default Search
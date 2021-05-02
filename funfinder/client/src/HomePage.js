import React from "react";
import NavBar from "./components/Navbar";
import HomeBody from "./components/HomeBody";

function HomePage( {username, setUsername, password, 
                    setPassword, loginStatus, setLoginStatus,
                    showWelcomeModal, setShowWelcomeModal }) {

    return (
      <div>
        <NavBar
          setUsername = {setUsername}
          setPassword = {setPassword}
          setShowWelcomeModal = {setShowWelcomeModal}
          setLoginStatus = {setLoginStatus} 
        />
        <HomeBody />
      </div>
    )
}

export default HomePage

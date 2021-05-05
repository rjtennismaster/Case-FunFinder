import React from "react";
import { Link } from 'react-router-dom'

function Navbar( {setUsername, setPassword, setShowWelcomeModal, 
                  setLoginStatus, firstName, lastName,
                  username, setFirstName, setLastName} ) {

  const logOut = () => {
    setUsername("")
    setPassword("")
    setFirstName("")
    setLastName("")
    setShowWelcomeModal(true)
    setLoginStatus("You are Logged Out")
  }

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <Link className = "navbar-brand" to = "/">
          Case Fun-Finder
        </Link>
        <div className = "collapse navbar-collapse" id="navbarCollapse">
          <ul className ="navbar-nav mr-auto">
            <Link className = "nav-link active" to = "/">
            <li className = "nav-item active">
                Home
            </li>
            </Link>
            <Link className = "nav-link active" to = "/search">
            <li className = "nav-item active">
                Restaurants
            </li>
            </Link>
            <Link className = "nav-link active" to = "/theatresearch">
            <li className = "nav-item active">
                Theatres
            </li>
            </Link>
            <Link className = "nav-link active" to = "/mhsearch">
            <li className = "nav-item active">
                Museums/Historical
            </li>
            </Link>
            <Link className = "nav-link active" to = "/funfolder">
            <li className = "nav-item active">
                Fun Folder
            </li>
            </Link>
          </ul>
        </div>
      </nav>
      <h5 className = "loggedInMessage">Logged In: {`${firstName} ${lastName}`} ({username})</h5>
      <Link to = "/">
      <button className = "logOutButton" onClick = {logOut}>Log Out</button>
      </Link>
    </div>
  )
}

export default Navbar

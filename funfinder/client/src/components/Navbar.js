import React from "react";
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div>
      <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
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
                Search
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
      <button className = "logOutButton">Log Out</button>
    </div>
  )
}

export default Navbar

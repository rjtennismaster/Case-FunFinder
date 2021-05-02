import React from "react";
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div>
      <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <a class="navbar-brand" href="#">
          Case Fun-Finder
        </a>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a href="/" class="nav-link active">
                Home
              </a>
            </li>
            <li class="nav-item active">
              <a href="/fun" class="nav-link acive">
                Folder
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <button className = "logOutButton">Log Out</button>
    </div>
  )
}

export default Navbar

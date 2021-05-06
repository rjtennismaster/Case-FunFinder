import React from "react"
import { Link } from 'react-router-dom'

function HomeBody() {
    return (
      <div role="main" className ="container">
        <div className="jumbotron">
          <h1>Let's have some fun CWRU</h1>
          <p className ="lead">Search for fun things to do in the Cleveland area!</p>
          <Link className = "btn btn-lg btn-primary" to = "/search">
            Make your fun folder &raquo;
          </Link>
        </div>
      </div>
    )
}

export default HomeBody

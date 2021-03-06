import React from "react"
import { Link } from 'react-router-dom'

function HomeBody() {
    return (
      <div className = "introContainer">
        <div className="jumbotron">
          <h1>Let's have some Fun CWRU</h1>
          <p className ="lead">Search for fun things to do around the Cleveland area!</p>
          <Link className = "btn btn-lg btn-primary" to = "/search">
            Make your fun folder &raquo;
          </Link>
        </div>
      </div>
    )
}

export default HomeBody

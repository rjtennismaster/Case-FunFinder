import React from "react";
import DropDown from "./DropDown";

function SearchBody () {

    return (
      <div role="main" className="container">
        <div class="jumbotron">
          <h1>See What's Happening Near You!</h1>
          <p class="lead">Search for fun things on campus</p>
          <DropDown />
        </div>
      </div>
    )
}

export default SearchBody

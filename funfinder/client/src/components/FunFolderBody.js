import React from "react";
import DropDown from "./DropDown";

function FunFolderBody () {

    return (
      <div role="main" className="container">
        <div class="jumbotron">
          <h1>See What's Happenin Near You!</h1>
          <p class="lead">Search for fun things on campus</p>
          <DropDown />
        </div>
      </div>
    )
}

export default FunFolderBody

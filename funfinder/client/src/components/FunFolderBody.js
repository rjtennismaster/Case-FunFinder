import React, { Component } from "react";
import DropDown from "./DropDown";

export default class FunFolderBody extends Component {
  render() {
    return (
      <div role="main" class="container">
        <div class="jumbotron">
          <h1>See What's Happenin Near You!</h1>
          <p class="lead">Search for fun things on campus</p>
          <DropDown />
        </div>
      </div>
    );
  }
}

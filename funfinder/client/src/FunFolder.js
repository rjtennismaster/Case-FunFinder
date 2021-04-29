import React, { Component } from "react";
import FunFolderBody from "./components/FunFolderBody";
import NavBar from "./components/Navbar";

export default class FunFolder extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <FunFolderBody />
      </div>
    );
  }
}

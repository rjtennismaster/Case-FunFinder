import React, { Component } from "react";
import NavBar from "./components/Navbar";
import HomeBody from "./components/HomeBody";

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <HomeBody />
      </div>
    );
  }
}

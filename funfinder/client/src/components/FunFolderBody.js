import React, { Component } from "react";

export default class FunFolderBody extends Component {
  render() {
    return (
      <div role="main" class="container">
        <div class="jumbotron">
          <h1>This is the fun folder</h1>
          <p class="lead">Search for fun things on campus</p>
          <a href="/fun" class="btn btn-lg btn-primary">
            Search&raquo;
          </a>
        </div>
      </div>
    );
  }
}

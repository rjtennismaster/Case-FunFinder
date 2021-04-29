import React, { Component } from "react";

export default class HomeBody extends Component {
  render() {
    return (
      <div role="main" class="container">
        <div class="jumbotron">
          <h1>Let's have some fun CWRU</h1>
          <p class="lead">Our app looks for fun things to do on campus.</p>
          <a href="/fun" class="btn btn-lg btn-primary">
            Make your fun folder &raquo;
          </a>
        </div>
      </div>
    );
  }
}

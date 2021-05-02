import React from "react";

function HomeBody() {
    return (
      <div role="main" className ="container">
        <div className="jumbotron">
          <h1>Let's have some fun CWRU</h1>
          <p className ="lead">Our app looks for fun things to do on campus.</p>
          <a href="/search" className ="btn btn-lg btn-primary">
            Make your fun folder &raquo;
          </a>
        </div>
      </div>
    )
}

export default HomeBody

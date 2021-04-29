import React from "react";

function Navbar() {
  return (
    <div>
      <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <a class="navbar-brand" href="#">
          Case Fun-Finders
        </a>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a href="/" class="nav-link">
                Home
              </a>
            </li>
            <li class="nav-item active">
              <a href="/fun" class="nav-link">
                Folder
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

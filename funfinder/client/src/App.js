import "./App.css"
import Search from "./Search"
import HomePage from "./HomePage"
import FunFolder from "./components/FunFolder"
import "bootstrap/dist/css/bootstrap.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import React, { useState } from "react"



function App() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loginStatus, setLoginStatus] = useState("")
  const [showWelcomeModal, setShowWelcomeModal] = useState("")

  return (
    <Router>
      <div>
        <Switch>
          <Route 
          path = "/" exact
          render = {(props) => <HomePage
                                  {...props}
                                  username = {username}
                                  password = {password}
                                  setUsername = {setUsername}
                                  setPassword = {setPassword}
                                  loginStatus = {loginStatus}
                                  setLoginStatus = {setLoginStatus}
                                  showWelcomeModal = {showWelcomeModal}
                                  setShowWelcomeModal = {setShowWelcomeModal}
                              />}
          />
          <Route 
          path = "/search" 
          render = {(props) => <Search
                                  {...props}
                                  username = {username}
                                  password = {password}
                                  setUsername = {setUsername}
                                  setPassword = {setPassword}
                                  loginStatus = {loginStatus}
                                  setLoginStatus = {setLoginStatus}
                                  showWelcomeModal = {showWelcomeModal}
                                  setShowWelcomeModal = {setShowWelcomeModal}
                              />}
          />
          <Route 
          path = "/funfolder" 
          render = {(props) => <FunFolder
                                  {...props}
                                  username = {username}
                                  password = {password}
                                  setUsername = {setUsername}
                                  setPassword = {setPassword}
                                  loginStatus = {loginStatus}
                                  setLoginStatus = {setLoginStatus}
                                  showWelcomeModal = {showWelcomeModal}
                                  setShowWelcomeModal = {setShowWelcomeModal}
                              />}
          />
        </Switch>
      </div>
    </Router>
  )
}

export default App

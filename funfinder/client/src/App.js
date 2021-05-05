import "./App.css"
import RestaurantSearch from "./RestaurantSearch"
import HomePage from "./HomePage"
import TheatreSearch from "./components/TheatreSearch"
import MHSearch from "./components/MHSearch"
import FunFolder from "./components/FunFolder"
import "bootstrap/dist/css/bootstrap.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import React, { useState } from "react"



function App() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [loginStatus, setLoginStatus] = useState("")
  const [showWelcomeModal, setShowWelcomeModal] = useState(true)

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
                                  firstName = {firstName}
                                  setFirstName = {setFirstName}
                                  setLastName = {setLastName}
                                  lastName = {lastName}
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
          render = {(props) => <RestaurantSearch
                                  {...props}
                                  username = {username}
                                  password = {password}
                                  setFirstName = {setFirstName}
                                  setLastName = {setLastName}
                                  firstName = {firstName}
                                  lastName = {lastName}
                                  setUsername = {setUsername}
                                  setPassword = {setPassword}
                                  setLoginStatus = {setLoginStatus}
                                  showWelcomeModal = {showWelcomeModal}
                                  setShowWelcomeModal = {setShowWelcomeModal}
                              />}
          />
          <Route 
          path = "/theatresearch" 
          render = {(props) => <TheatreSearch
                                  {...props}
                                  username = {username}
                                  password = {password}
                                  setFirstName = {setFirstName}
                                  setLastName = {setLastName}
                                  firstName = {firstName}
                                  lastName = {lastName}
                                  setUsername = {setUsername}
                                  setPassword = {setPassword}
                                  setLoginStatus = {setLoginStatus}
                                  showWelcomeModal = {showWelcomeModal}
                                  setShowWelcomeModal = {setShowWelcomeModal}
                              />}
          />
          <Route 
          path = "/mhsearch" 
          render = {(props) => <MHSearch
                                  {...props}
                                  username = {username}
                                  password = {password}
                                  setFirstName = {setFirstName}
                                  setLastName = {setLastName}
                                  firstName = {firstName}
                                  lastName = {lastName}
                                  setUsername = {setUsername}
                                  setPassword = {setPassword}
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
                                  firstName = {firstName}
                                  setFirstName = {setFirstName}
                                  setLastName = {setLastName}
                                  lastName = {lastName}
                                  setUsername = {setUsername}
                                  setPassword = {setPassword}
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

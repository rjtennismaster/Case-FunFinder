import React from "react"
import NavBar from "./components/Navbar"
import HomeBody from "./components/HomeBody"
import WelcomeModal from "./components/WelcomeModal"
import SignupModal from "./components/SignupModal"
import LoginModal from "./components/LoginModal"

function HomePage( {username, setUsername, password,
                    firstName, setFirstName, lastName, setLastName, 
                    setPassword, loginStatus, setLoginStatus,
                    showWelcomeModal, setShowWelcomeModal }) {

    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showSignupModal, setShowSignupModal] = useState(false)

    return (
      <div>
        <NavBar
          username = {username}
          password = {password}
          setLoginStatus = {setLoginStatus}
          setUsername = {setUsername}
          setPassword = {setPassword}
          firstName = {firstName}
          lastName = {lastName}
          setFirstName = {setFirstName}
          setLastName = {setLastName}
          setShowWelcomeModal = {setShowWelcomeModal}
        />
        <HomeBody />
        <WelcomeModal
          showWelcomeModal = {showWelcomeModal}
          setShowWelcomeModal = {setShowWelcomeModal}
          setShowLoginModal = {setShowLoginModal}
          setShowSignupModal = {setShowSignupModal}
        />
        <SignupModal
          showSignupModal = {showSignupModal}
          setShowLoginModal = {setShowLoginModal}
          setShowSignupModal = {setShowSignupModal}
          username = {username}
          password = {password}
          firstName = {firstName}
          lastName = {lastName}
          setUsername = {setUsername}
          setPassword = {setPassword}
          firstName = {firstName}
          lastName = {lastName}
          setFirstName = {setFirstName}
          setLastName = {setLastName}
        />
        <LoginModal
          username = {username}
          password = {password}
          setUsername = {setUsername}
          setPassword = {setPassword}
          loginStatus = {loginStatus}
          setLoginStatus = {setLoginStatus}
          showLoginModal = {showLoginModal}
          setShowLoginModal = {setShowLoginModal}
          setShowSignupModal = {setShowSignupModal}
        />
      </div>
    )
}

export default HomePage

import React from 'react'
import Modal from 'react-modal'
import '../css/WelcomeModal.css'


Modal.setAppElement('#root')

function WelcomeModal({ showWelcomeModal, setShowWelcomeModal, setShowLoginModal, setShowSignupModal }) {

    const customStyles = {
        content : {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          padding: '150px',
          border: '2px solid black',
          transform: 'translate(-50%, -50%)',
          background: '#FFD700'
        }
    }
    
    return (
        <Modal
                isOpen = {showWelcomeModal}
                shouldCloseOnOverlayClick = {false}
                style = {customStyles}>
            <div id = "welcomeSign">
                <h1>Welcome to MarketView!</h1>
            </div>
            <button id = {"button1"} onClick = {() => {
                    setShowWelcomeModal(false)
                    setShowLoginModal(true)
                }}>Log In
            </button>
            <button id = {"button2"} onClick = {() => {
                    setShowWelcomeModal(false)
                    setShowSignupModal(true)
                }}>Sign Up
            </button> 
        </Modal>
    )
}

export default WelcomeModal
import React, { useState, useEffect } from "react"
import NavBar from "./Navbar"
import Axios from "axios"
import Modal from "react-modal"

function FunFolder( {username, setUsername, password, 
    setPassword, setLoginStatus, setShowWelcomeModal,
    firstName, lastName, setFirstName, setLastName} ) {

    const [showAttractionModal, setShowAttractionModal] = useState(false)
    const [funFolderItems, setFunFolderItems] = useState([])
    const [favoritesItems, setFavoritesItems] = useState([])

    useEffect(() => {
      Axios.get("http://localhost:3003/getFunFolder", {
            params: {
                username: username
            }
        }).then((response) => {
            setFunFolderItems(response.data.map((funItem) => {
              return funItem
            }))
        })
      
      Axios.get("http://localhost:3003/getFavorites", {
            params: {
                username: username
          }
      }).then((response) => {
          setFavoritesItems(response.data.map((funItem) => {
            return funItem
          }))
      })
    })


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
        <div className = "bigContainer">
          <div className = "funFolderContainer">
            <div className = "folderTitle">
              <h1>Fun Folder</h1>
            </div>
            <div className = "folderContent">

            </div>
          </div>
        </div>
      </div>
    )
}

export default FunFolder
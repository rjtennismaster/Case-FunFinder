import React, { useState, useEffect } from "react"
import NavBar from "./Navbar"
import Axios from "axios"
import './FunFolder.css'


function FunFolder( {username, setUsername, password, 
    setPassword, setLoginStatus, setShowWelcomeModal,
    firstName, lastName, setFirstName, setLastName} ) {

    const [funFolderItems, setFunFolderItems] = useState([])
    const [favoritesItems, setFavoritesItems] = useState([])
    const [successfulAdd, setSuccessfulAdd] = useState("")
    

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
    }, [funFolderItems])

    const removeAttraction = (event) => {
      const fun = event.currentTarget.dataset.funid1
      Axios.delete(`http://localhost:3003/removeAttraction/${username}/${fun}`)
      .then(() => {
        setFunFolderItems(
          funFolderItems.filter((item) => {
            return item.fun_id !== fun
          })
        )
      })
    }

    const addToFavorites = (event) => {
      const savedFunID = event.currentTarget.dataset.funid2
      console.log("this is the saved fun iD!" + savedFunID)
      const savedName = event.currentTarget.dataset.name

      Axios.post("http://localhost:3003/addToFavorites/", {
        username: username,
        fun_id: savedFunID,
        name: savedName
      }).then((response) => {
        setFavoritesItems([
          ...favoritesItems,
          {
            fun_id: savedFunID,
            cwru_id: username,
            attraction_name: savedName
          }
        ])
        setSuccessfulAdd(response.data.message)
          setTimeout(() => {
            setSuccessfulAdd("")
          }, 5000)
      })
    }

    const removeFromFavorites = (event) => {
      const funId = event.currentTarget.dataset.funid
      Axios.delete(`http://localhost:3003/removeFromFavorites/${username}/${funId}`)
      .then(() => {
        setFavoritesItems(
          favoritesItems.filter((item) => {
            return item.fun_id !== funId
          })
        )
      })
    }

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
              {funFolderItems.map((item, index) => {
                return (
                  <div className = "funFolderItem" key = {index}>
                    <h4>{item.attraction_name}</h4>
                    <ul>
                      <li>Type: {item.attraction_type}</li>
                      <li>Location: {item.street_address} {item.city}, OH {item.zip_code}</li>
                      <li>Opens at (Military Time): {item.opening_hour}</li>
                      <li>Closes at (Military Time): {item.closing_hour}</li>
                      <li>Do I need a mask? {item.mask_required}</li>
                      <li>Rating out of 5: {item.rating}</li>
                    </ul>
                  
                    <button
                      className = "folderRemoveB" 
                      key = {index + 12389} 
                      data-funid1 = {item.fun_id} 
                      onClick = {(event) => removeAttraction(event)}>
                      Remove from Fun Folder
                    </button>
                    <button 
                      className = "folderAddB"
                      key = {index + 456} 
                      data-funid2 = {item.fun_id}
                      data-name = {item.attraction_name} 
                      onClick = {addToFavorites}>
                      Add to Favorites
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
          <div className = "favoritesContainer">
            <div className = "favoritesTitle">
              <h1>Favorites</h1>
            </div>
            <div className = "favoritesContent">
            <h6>{successfulAdd}</h6>
            {favoritesItems.map((item, index) => {
                return (
                <div key = {index + 789} className = "favoritesItem">
                  <h4>{item.attraction_name}</h4>
                  <ul>
                      <li>Type: {item.attraction_type}</li>
                      <li>Location: {item.street_address} {item.city}, OH {item.zip_code}</li>
                      <li>Opens at (Military Time): {item.opening_hour}</li>
                      <li>Closes at (Military Time): {item.closing_hour}</li>
                      <li>Do I need a mask? {item.mask_required}</li>
                      <li>Rating out of 5: {item.rating}</li>
                  </ul>  
                  <button key = {index + 147}
                          className = "favRemoveB"
                          data-funid = {item.fun_id}
                          onClick = {removeFromFavorites}
                          >
                            Remove from Favorites
                  </button>
                </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
}

export default FunFolder
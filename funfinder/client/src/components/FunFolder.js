import React, { useState, useEffect } from "react"
import NavBar from "./Navbar"
import Axios from "axios"


function FunFolder( {username, setUsername, password, 
    setPassword, setLoginStatus, setShowWelcomeModal,
    firstName, lastName, setFirstName, setLastName} ) {

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

    const removeAttraction = (event) => {
      const fun = event.currentTarget.dataset.funid
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
      Axios.post("http://localhost:3003/addToFavorites/", {
        username: username,
        fun_id: event.currentTarget.dataset.funid,
        name: event.currentTarget.dataset.name
      }).then(() => {
        setFavoritesItems([
          ...favoritesItems,
          {
            fun_id: event.currentTarget.dataset.funid,
            cwru_id: username,
            attraction_name: event.currentTarget.dataset.name
          }
        ])
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
                      key = {index + 1} 
                      data-funid = {item.fun_id} 
                      onClick = {removeAttraction}>
                      Remove from Fun Folder
                    </button>
                    <button 
                      key = {index + 2} 
                      data-funid = {item.fun_id}
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
            {favoritesItems.map((item, index) => {
                return (
                <div key = {index} className = "favoritesItem">
                  <h4>{item.attraction_name}</h4>
                  <ul>
                      <li>Type: {item.attraction_type}</li>
                      <li>Location: {item.street_address} {item.city}, OH {item.zip_code}</li>
                      <li>Opens at (Military Time): {item.opening_hour}</li>
                      <li>Closes at (Military Time): {item.closing_hour}</li>
                      <li>Do I need a mask? {item.mask_required}</li>
                      <li>Rating out of 5: {item.rating}</li>
                  </ul>  
                  <button key = {index + 1}
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
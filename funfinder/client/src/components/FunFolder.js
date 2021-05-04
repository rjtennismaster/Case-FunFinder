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
    const [itemToShow, setItemToShow] = useState([])
    

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


    const getAttractionInfo = (event) => {
      Axios.get("http://localhost:3003/getAttractionInfo", {
        params: {
          funId: event.target.value
        }
      }).then((response) => {
        setItemToShow(response.data[0])
      })
    }

    const removeAttraction = () => {
      const fun = itemToShow.fun_id
      Axios.delete(`http://localhost:3003/removeAttraction/${username}/${fun}`)
      .then(() => {
        setFunFolderItems(
          funFolderItems.filter((item) => {
            return item.fun_id !== itemToShow.fun_id
          })
        )
        setShowAttractionModal(false)
      })
    }

    const addToFavorites = () => {
      Axios.post("http://localhost:3003/addToFavorites/", {
        username: username,
        fun_id: itemToShow.fun_id,
        name: itemToShow.attraction_name
      }).then(() => {
        setFavoritesItems([
          ...favoritesItems,
          {
            fun_id: itemToShow.fun_id,
            cwru_id: username,
            attraction_name: itemToShow.attraction_name
          }
        ])
      })
    }

    const removeFromFavorites = (event) => {
      const funId = event.target.value
      Axios.delete(`http://localhost:3003/removeFromFavorites/${username}/${funId}`)
      .then(() => {
        setFavoritesItems(
          favoritesItems.filter((item) => {
            return item.fun_id !== event.target.value
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
                <button key = {index} value = {item.fun_id} onClick = {(event) =>  {getAttractionInfo(event)
                  setShowAttractionModal(true)}
                }><h6>{item.attraction_name}</h6>
                </button>
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
                <button key = {index}
                        value = {item.fun_id}
                        onClick = {(event) => removeFromFavorites(event)}
                        >
                  <h6>{item.attraction_name}</h6>
                </button>
                )
              })}
            </div>
          </div>
        </div>
        <Modal 
          className = "funModal"
          isOpen = {showAttractionModal}
          fade ={false}
        >
          <div className = "modalResults">
            <h1>{itemToShow.attraction_name}</h1>
            <ul>
              <li>Type: {itemToShow.attraction_type}</li>
              <li>City: {itemToShow.city}</li>
              <li>Street Address: {itemToShow.street_address}</li>
              <li>Zip Code: {itemToShow.zip_code}</li>
              <li>Opens at: {itemToShow.opening_hour}</li>
              <li>Closes at: {itemToShow.closing_hour}</li>
              <li>Do I need a mask? {itemToShow.mask_required}</li>
              <li>Rating: {itemToShow.rating}</li>
            </ul>
          </div>
          <button onClick = {() => setShowAttractionModal(false)}>
            Close Attraction Information
          </button>
          <button onClick = {removeAttraction}>
            Remove from Fun Folder
          </button>
          <button onClick = {addToFavorites}>
            Add to Favorites
          </button>
        </Modal>
      </div>
    )
}

export default FunFolder
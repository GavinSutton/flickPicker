import React from 'react'
import firebase from './firebase.js'

function FlickList(props) {
    const removeFilm = () => {
        const filmRef = firebase.database().ref(props.filmList.filmId)
        filmRef.remove()
    }

    // Deconstruct the props for ease of use
    const {filmList} = props
    const {filmName, filmId} = filmList

    return(
        <li className="flickListItem" id={filmId}>
            <h3>{filmName.filmName}</h3>
            <img src={filmName.filmImg} alt={"A Poster for " + filmName.filmName}/>
            <button onClick={removeFilm}>Remove</button>
        </li> 
    )
}

export default FlickList
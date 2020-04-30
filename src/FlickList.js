import React from 'react'

function FlickList(props) {
    console.log(props)
    return(
        <React.Fragment>
            {
            props.filmList.map((film) => {
                return (
                    <li key={film.filmId} className="flickListItem">
                        <img src={film.filmImg} alt={"A Poster for " + film.filmName}/>
                        <p>{film.filmName}</p>
                    </li>
                )
            })
            }
        </React.Fragment>
    )
}

export default FlickList
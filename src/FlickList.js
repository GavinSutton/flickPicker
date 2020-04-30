import React from 'react'

function FlickList(props) {
    return(
        <React.Fragment>
            {
            props.filmList.map((film) => {
                return (
                    <li>{film}</li>
                )
            })
            }
        </React.Fragment>
    )
}

export default FlickList
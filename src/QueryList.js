import React from 'react'

function QueryList(props) {
    return (
        <li>
            <a href="#" className="addItem queryItem">
                <div className="imgContainer">
                    <img src={"https://image.tmdb.org/t/p/w500/" + props.query.poster_path} alt="" />
                </div>
                <div className="queryContent">
                    <h3>{props.query.title}</h3>
                    <p>{props.query.overview}</p>
                </div>
            </a>
        </li>
    )
}

export default QueryList
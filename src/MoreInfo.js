import React, { Component } from 'react'
import errorPoster from './assets/errorPoster.jpg'

class MoreInfo extends Component {


    render() {
        const info = this.props.movieInfo
        const cast = this.props.castInfo
        const date = info.release_date
        console.log(this.props.videoInfo)
        return(
            <div className="movieInfo">
                <div className="posterAndInfo">
                    <div className="movieInfoImgContainer">
                        <img src={info.poster_path === null ? errorPoster : "https://image.tmdb.org/t/p/w500" + info.poster_path} alt={"Poster for " + info.title} />
                    </div>
                    <div className="movieInfoContentContainer">
                        <h3>{info.title}</h3>
                        {this.props.castInfo.length ?
                            <p> Starring: {cast[0].name}, {cast[1].name}, {cast[2].name}</p>
                            : null
                        }
                        <p>Release Date: {date} </p>
                        <p>Runtime: {info.runtime} minutes</p>
                        <p>User Rating: {info.vote_average}/10</p>
                    </div>
                </div>
                <div className="trailerBox">
                    {
                        this.props.videoInfo === undefined ? <p>No Trailer Avaialable</p> : <iframe src={"https://www.youtube.com/embed/" + this.props.videoInfo.key} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen className="trailer"></iframe>
                    }
                </div>
                <button onClick={this.props.infoBox}>Close</button>
            </div>
        )
    }
}


export default MoreInfo
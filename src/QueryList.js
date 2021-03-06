import React, { Component } from 'react'
import errorPoster from './assets/errorPoster.jpg'

class QueryList extends Component {

    waitAddToUserList  = (event) => {
        this.props.addToUserList(event, event.target.value, event.target.id, event.target.attributes.data.value)
        this.added(event.target.id)
    }

    moreInfo = (event) => {
        this.props.moreInfo(event.target.value)
        this.props.infoBox()
    }

    added = (id) => {
        let button = document.getElementById(id)
        button.innerHTML="Added"
    }

    render(){
        return (
            <React.Fragment>
                {this.props.error ? <li className="error"><p>Sorry, there are no movies with that name available.</p> <p>Please try again.</p> </li> :null}
                
                {
                    this.props.queryList.map((props) => {
                        
                        return (
                            <li key={props.id} className="queryItem">
                                <div className="imgContainer">
                                    <img src={props.poster_path === null ? errorPoster : "https://image.tmdb.org/t/p/w500" + props.poster_path} alt={"Poster for " + props.title} />
                                </div>
                                <div className="queryContent">
                                    <h3>{props.title}</h3>
                                    <div className="overviewBox">
                                        <p>{props.overview}</p>
                                    </div>
                                    <div>
                                    <button
                                        onClick={this.moreInfo}
                                        value={props.id}
                                    >
                                        More Info
                                    </button>
                                    <button
                                        onClick={this.waitAddToUserList}
                                        value={props.title}
                                        id={props.id}
                                        data={"https://image.tmdb.org/t/p/w500" + props.poster_path}
                                    >
                                        Add Fick
                                    </button>
                                    </div>
                                </div>
                            </li>
                        )
                    })
                }
            </React.Fragment>
        )
    }

}

export default QueryList
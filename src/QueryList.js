import React, { Component } from 'react'

class QueryList extends Component {

    waitAddToUserList  = (event) => {
        this.props.addToUserList(event, event.target.value, event.target.id, event.target.attributes.data.value)
    }

    render(){
        return (
            <React.Fragment>
                {
                    this.props.queryList.map((props) => {
                        // console.log(props)
                        return (
                            <li key={props.id} className="addItem queryItem">
                                    <div className="imgContainer">
                                        <img src={"https://image.tmdb.org/t/p/w500" + props.poster_path} alt={"Poster for " + props.title} />
                                    </div>
                                    <div className="queryContent">
                                        <h3>{props.title}</h3>
                                        <div className="overviewBox">
                                            <p>{props.overview}</p>
                                        </div>
                                        <button
                                            onClick={this.waitAddToUserList}
                                            value={props.title}
                                            id={props.id}
                                            data={"https://image.tmdb.org/t/p/w500" + props.poster_path}
                                        >
                                            Add Flick
                                        </button>
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
import React, { Component } from 'react'

class QueryList extends Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         userChoice: []
    //     }
    // }


    waitAddTouserList  = (event) => {
        this.props.addToUserList(event, event.target.value)
    }

    render(){
        return (
            <React.Fragment>
                {
                    this.props.queryList.map((props) => {
                        console.log(props)
                        return (
                            <li key={props.id} className="addItem queryItem">
                                    <div className="imgContainer">
                                        <img src={"https://image.tmdb.org/t/p/w500/" + props.poster_path} alt={"Poster for " + props.title} />
                                    </div>
                                    <div className="queryContent">
                                        <h3>{props.title}</h3>
                                        <p>{props.overview}</p>
                                    <button
                                        onClick={this.waitAddTouserList}
                                        value={props.title}
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

// function QueryList(props) {
//     return (
//         <React.Fragment>
//             { 
//             props.queryList.map((props) => {
//                 return(
//                     <li key={props.id}>
//                         <button className="addItem queryItem">
//                             <div className="imgContainer">
//                                 <img src={"https://image.tmdb.org/t/p/w500/" + props.poster_path} alt="" />
//                             </div>
//                             <div className="queryContent">
//                                 <h3>{props.title}</h3>
//                                 <p>{props.overview}</p>
//                             </div>
//                         </button>
//                     </li>
//                 )
//             })
//             }
//         </React.Fragment>
//     )
// }

export default QueryList
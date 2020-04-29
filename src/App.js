import React, { Component } from 'react';
import FlickList from './FlickList.js'
// import Form from './Form.js'
import Help from './Help.js'
import QueryList from './QueryList.js'
import firebase from './firebase.js'
import axios from 'axios'

import './App.css';


// ideas: 


class App extends Component {
  constructor(){
    super();
    this.state = {
      filmList: ["Test One", "Test Two"],
      queryList: [],
      userInput: ""
    }
  }

  // Get data from TMDB via Axios
  // componentDidMount() {
  //   axiosCall()
  // }

  axiosCall = (userQuery) => {
    axios({
      url: `https://api.themoviedb.org/3/search/movie`,
      method: `GET`,
      responseType: `json`,
      params: {
        api_key: `4f70306aa4e939e1535c12686b6403c7`,
        query: userQuery
      }
    }).then((response) => {
      console.log(response.data.results)
      this.setState({
        queryList: response.data.results
      })
    })
  }

  handleChange = (event) => {
    this.setState({
      userInput: event.target.value
    })
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    if(this.state.userInput !== ''){
      const userQuery = this.state.userInput
      const newFilmList = [...this.state.filmList]
      newFilmList.push(this.state.userInput)
      this.setState({
        filmList: newFilmList
      })
      // Search for film
      this.axiosCall(userQuery)
      // axios({
      //   url: `https://api.themoviedb.org/3/search/movie`,
      //   method: `GET`,
      //   responseType: `json`,
      //   params: {
      //     api_key: `4f70306aa4e939e1535c12686b6403c7`,
      //     query: userQuery
      //   }
      // }).then((response) => {
      //   console.log(response.data.results)
      //   this.setState({
      //     queryList: response.data.results
      //   })
      // })

    }
  }


  render(){
    return (
      <div className="App">
        <h1>FlickPicker</h1>
        {/* Help section start */}
        <Help />
        {/* Help section end */}


        {/* Form section start */}
        <form onSubmit={this.handleFormSubmit}>
          <input type="text" value={this.state.userInput} onChange={this.handleChange} />
          <button>Add to list</button>
        </form>
        {/* Form section end */}


        {/* Search query list start */}
        <ul className="queryList">
          {
            this.state.queryList.map((apiData) => {
              return (
                <QueryList query={apiData} />
              )
            })
          }
        </ul>
        {/* Search query list end */}


        {/* List section start */}
        <h2>Your Flicks</h2>
        <ul>
          {
            this.state.filmList.map((film)=>{
              return(
                <FlickList key={film} flicks={film} />
              )
            })
          }
        </ul>
        {/* List section end */}


      </div>
    );
  }
}

export default App;

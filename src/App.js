import React, { Component } from 'react';
import FlickList from './FlickList.js'
import Form from './Form.js'
import Help from './Help.js'
import QueryList from './QueryList.js'
import firebase from './firebase.js'
import axios from 'axios'
// import AxiosCall from 'AxiosCall.js'

import './App.css';


// ideas: 
// If search query is empty, need to say "No films found by that name"
// const my array = []
// if (array.length === 0 ).....
// search by actor
// Delete list items
// Maybe use grid and then add change class?
// Look up hamburger menu in react. 
// CONNECT TO FIREBASE
// See if you can figure out a better key scenaria

class App extends Component {
  // Constructor storing states. 
  constructor(){
    super();
    this.state = {
      // filmList stores the "final list" that user has chosen
      filmList: [],
      // queryList stores the list of films from the API call
      queryList: [],
      userInput: "",
      active: false
    }
  }

  componentDidMount() {
    const dbRef = firebase.database().ref();
    dbRef.on(`value`, (dbResponse) => {
      const filmListFromDb = [];
      const dataFromDb = dbResponse.val();
      for (let key in dataFromDb) {
        filmListFromDb.push(dataFromDb[key])
      }
      this.setState({
        filmList: filmListFromDb
      })
    })
  }


  // axios in a function to make the code a little cleaner, and so I can reuse if need be. 
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
      this.setState({
        queryList: response.data.results
      })
    })
  }

  // METHODS START 
    // handleChange captures the value change from the search input and pushes it into this.state.userInput (to be used for searching for a film)
    handleChange = (event) => {
      this.setState({
        userInput: event.target.value
      })
    }


    handleFormSubmit = (event, userSearchValue) => {
      event.preventDefault();
      // an if statement to stop fom empty search queries. If not empty, then we call Axios to search for the user's query.  
      if (userSearchValue !== '') {
        this.axiosCall(userSearchValue)
      }
    }

    // Adds a film to the list. The parameters are grabbed from QueryList.js when a user clicks to add a film
    handleAddToUserList = (event, filmName, filmId, filmImg) => {
      event.preventDefault();
      const dbRef = firebase.database().ref();
      dbRef.push({filmName: filmName, filmId: filmId, filmImg: filmImg})
      this.setState({
        userInput: ""
      })
    }

    // Toggles the active state to true or false which toggles the FlickList.js on and off the screen
    handleShowList = () => {
      this.setState({
        active: !this.state.active
      })
    }

    // This looks into the film list and randomizes one to watch tonight. 
    handleRandomize = () => {
      const randomFilm = [...this.state.filmList]
      const randomNumber = Math.floor(Math.random() * randomFilm.length)
      alert("You should watch " + randomFilm[randomNumber].filmName)
    }


  // METHODS END

  render(){
    return (
      <div className="App">
        <div className="wrapper flex">  
          <main>
            <h1>FlickPicker</h1>
            <button onClick={this.handleShowList}>Show My List</button>
            {/* Help.js section start */}
            <Help />
            {/* Help.js section end */}


            {/* Form.js section start */}
            <Form 
              wow={this.wow} 
              handleFormSubmit={this.handleFormSubmit} 
              handleChange={this.handleChange}/>
            {/* Form.js section end */}

            <article>
              {/* Search query list (QueryList.js) start */}
              <ul className="queryList">
                <QueryList queryList={this.state.queryList} addToUserList={this.handleAddToUserList}/>
              </ul>
              {/* Search query list (QueryList.js) end */}
            </article>

            
          </main>
          {
            this.state.active
              ?
              <aside>
                {/* List section (FlickList.js) start */}
                <h2>Your Flicks</h2>
                <ul className="userList">
                  <FlickList filmList={this.state.filmList} />
                </ul>
                <button onClick={this.handleRandomize}>Randomize</button>
                {/* List section (FlickList.js) end */}
              </aside>
              : null
          }
        </div>
      </div>
    );
  }
}

export default App;

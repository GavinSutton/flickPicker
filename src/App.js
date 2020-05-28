import React, { Component } from 'react';
import FlickList from './FlickList.js'
import Form from './Form.js'
import Help from './Help.js'
import QueryList from './QueryList.js'
import firebase from './firebase.js'
import axios from 'axios'
import './App.css';

class App extends Component {
  // Constructor storing states. 
  constructor(){
    super();
    this.state = {
      // filmList stores the "final list" that user has chosen
      filmList: [],
      // queryList stores the list of films from the API call
      queryList: [],
      // userInput is what the user inputs into the search bar
      userInput: "",
      // active is a boolean state that controls a few display/hide features
      active: false,
      // headerActive contols the headerUp and headerDown classes
      headerActive: false,
      // when error turns true (via aviosCall when a query is empty) then an error message is displayed. 
      error: false,
      // randomChoice is the film that the randomizer chooses for the user to watch.
      randomChoice: "",
      // checks for duplicates
      duplicate: null
    }
  }

  // This attaches firebase to the app
  componentDidMount() {
    const dbRef = firebase.database().ref();
    dbRef.on(`value`, (dbResponse) => {
      const filmListFromDb = [];
      const dataFromDb = dbResponse.val();
      for (let key in dataFromDb) {
        filmListFromDb.push( { filmName: dataFromDb[key], filmId: key})
      }
      this.setState({
        filmList: filmListFromDb
      })
    })
  }

  // METHODS START 
    // axios in a function to make the code a little cleaner, and so I can reuse if need be. 
    axiosCall = (userQuery) => {
      axios({
        url: `https://api.themoviedb.org/3/search/movie`,
        method: `GET`,
        responseType: `json`,
        params: {
          api_key: `4f70306aa4e939e1535c12686b6403c7`,
          query: userQuery,
          include_adult: 'false',
        }
      }).then((response) => {
        if (response.data.results.length !== 0) {
          this.setState({
            queryList: response.data.results,
            error: false
          })
        } else {
          this.setState({
            queryList: [],
            error: true
          })
        }
      })
    }

    // handleChange captures the value change from the search input and pushes it into this.state.userInput (to be used for searching for a film)
    handleChange = (event) => {
      this.setState({
        userInput: event.target.value
      })
    }

    // handleFormSubmit listens to the form submit, then puts the userInput into axios
    handleFormSubmit = (event, userSearchValue) => {
      event.preventDefault();
      // an if statement to stop fom empty search queries. If not empty, then we call Axios to search for the user's query.  
      if (userSearchValue !== '') {
        this.axiosCall(userSearchValue)
        this.setState({
          randomChoice: ""
        })
      }
    }

    // Adds a film to the list. The parameters are grabbed from QueryList.js when a user clicks to add a film
    handleAddToUserList = (event, filmName, filmId, filmImg) => {
      event.preventDefault();
      const dbRef = firebase.database().ref();
      dbRef.push({ filmName: filmName, filmId: filmId, filmImg: filmImg })
      this.setState({
        userInput: "",
      })
    }

    // Toggles the active state to true or false which toggles the FlickList.js (the side menu) on and off the screen
    handleShowList = () => {
      this.setState({
        active: !this.state.active
      })
    }

    // This looks into the film list and randomizes one to watch tonight. 
    handleRandomize = () => {
      const randomFilm = [...this.state.filmList]
      const randomNumber = Math.floor(Math.random() * randomFilm.length)
      this.setState({
        randomChoice: randomFilm[randomNumber].filmName.filmName,
        queryList: []
      })
    }

    // handleHeaderActive turns this.state.headerActive to true, and "opening" the page for the search query list to show. 
    handleHeaderActive = () => {
      this.setState({
        headerActive: true
      })
    }

  // METHODS END

  render(){
    return (
      <div className="App">
        <div className="wrapper flexCol relative" >  
            {/* Header section start */}
          <header>

              {/* headerUp/header down section start (moves up and down) */}
              <div className={this.state.headerActive? "headerUp flexCol" : "headerDown flexCol"}>
                <h1>FlickPicker</h1>
              <button onClick={this.handleShowList} className="hamburger" aria-label="Open your film list menu"><i className="fas fa-film"></i><span>{this.state.filmList.length}</span></button>


                {/* Help.js section start */}
                <Help />
                {/* Help.js section end */}


                {/* Form.js section start */}
                <Form 
                  wow={this.wow} 
                  handleFormSubmit={this.handleFormSubmit} 
                  handleChange={this.handleChange}
                  handleHeaderActive={this.handleHeaderActive} />
                {/* Form.js section end */}


              </div>
              {/* headerUp/header down section end */}


              {/* FlickList / Side Menu start */}
              <aside className={this.state.active ? "showList" : null}>
                <div className="menuTop">
                  <h2>Your FlickList</h2>
                </div>
                <ul className="userList">
                  <li></li>
                  {
                    this.state.filmList.map((film) => {
                      return (
                        <FlickList filmList={film} key={film.filmId} />
                      )
                    })
                  }
                </ul>
              <button onClick={this.handleRandomize} className={this.state.active ? "showList randomize" : "randomize"} aria-label="Randomize your film list">Randomize</button>

              </aside>
              {/* FlickList / Side Menu end */}

            </header>
            {/* Header section end */}


          <main>
            {/* Search query list (QueryList.js) start */}
            {
              this.state.headerActive ? 
              <ul className="queryList">
                  <QueryList queryList={this.state.queryList} error={this.state.error} addToUserList={this.handleAddToUserList}/>
              </ul>
              : null
            }
            {/* Search query list (QueryList.js) end */}

            {/* This displays the random choice for the user to watch */}
              {
                this.state.randomChoice !== "" ? 
                <div className="randomChoice">
                  <p>You should watch</p>
                  <h4>{this.state.randomChoice}</h4> 
                  <button aria-label="Close random choice" onClick={()=> this.setState({randomChoice:""})}>Thanks!</button>
                </div>
                : null
              }
            {/* This displays the random choice for the user to watch */}
            

          </main>
            
        </div>
      </div>
    );
  }
}

export default App;

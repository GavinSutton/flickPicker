import React, { Component } from 'react'

class Help extends Component {
    constructor(){
        super();
        this.state = {
            active: false
        }
    }

    handleShowHelp = () => {
        this.setState({
            active: !this.state.active
        })
    }

    render(){
        return(
            <div className="helpBox">
                <button className="showHelp" onClick={this.handleShowHelp} aria-label="Show help box">Instructions</button>
                {/* Help information: shown when {this.state.active: true} */}
                {this.state.active 
                    ? <div className="helpContents">
                        <p>Need helping picking a movie?</p>
                        <p>Find flicks you're interested in watching using the search bar below. Click "Add Flick" to add that movie to your FlickList. View your current FlickList by clicking the film strip button in the top right corner. Hit randomize and we'll make the choice for you.</p>
                    </div>
                    : null}
            </div>
        )
    }
}

export default Help
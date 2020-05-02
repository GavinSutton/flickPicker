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
                <button className="showHelp" onClick={this.handleShowHelp}>?</button>
                {/* Help information: shown when {this.state.active: true} */}
                {this.state.active 
                    ? <div className="helpContents">
                        <p>Having trouble deciding on a movie?</p>
                        <p>Find flicks that tikle your fancy using the search bar below. Click "Add Flick" to add that movie to the list. View your current list by clicking the film button. Hit randomize and we'll make the choice for you.</p>
                    </div>
                    : null}
            </div>
        )
    }
}

export default Help
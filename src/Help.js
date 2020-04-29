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
            <div>
                <button className="showHelp" onClick={this.handleShowHelp}>?</button>
                {/* Help information: shown when {this.state.active: true} */}
                {this.state.active 
                    ? <div className="help">
                        <p>Having trouble deciding on a movie?</p>
                        <p>Add movies that tickle your fancy to the list. Hit randomize and we'll make the choice for you.</p>
                    </div>
                    : null}
            </div>
        )
    }
}

export default Help
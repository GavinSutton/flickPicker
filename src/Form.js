import React, { Component } from 'react'


class Form extends Component {
    constructor() {
        super();
        this.state = {
            userInput: ""
        }
    }

    handleFormChange = (event) => {
        this.setState({
            userInput: event.target.value
        })
    }

    waitForOnSubmit = (event) => {
        this.props.handleFormSubmit(event, this.state.userInput)
        this.setState({
            userInput: ""
        })
    }


    render(){
        return(
            <form onSubmit={this.waitForOnSubmit}>
                <input 
                    type="text" 
                    value={this.state.userInput} 
                    onChange={this.handleFormChange}
                    placeholder="Enter film name"
                    className="formInput"
                />
                <button className="formButton" type="submit"> Search </button>
            </form>
        )
    }
}

export default Form
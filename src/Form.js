import React, { Component } from 'react'


class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userInput: ""
        }
    }

    handleChange = (event) => {
        this.setState({
            userInput: event.target.value
        })
    }

    handleFormSubmit = (event) => {
        event.preventDefault();   
        // alert(this.state.userInput) 
    }

    render(){
        return(
            <form onSubmit={this.handleFormSubmit}>
                <input type="text" value={this.state.userInput} onChange={this.handleChange}/>
                <button>Add to list</button>
            </form>
        )
    }
}

export default Form
import React from 'react'
import axios from 'axios'

AxiosCall = (userQuery) => {
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

export default AxiosCall;
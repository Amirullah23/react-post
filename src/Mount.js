import React, { Component } from 'react'

export default class Mount extends Component {
    constructor(props){
        super(props)

        this.state = {
            color: "red",
            text : "mount data",
            api : []
        }

    }

    componentDidMount = () => {
        fetch("https://api.github.com/users/Amirullah23")
        .then(response => {
            return response.json()
        })
        .then(data => {
            this.setState({api: data })
        })
    }

        
    


    render() {
        return (
            <div>
    <h1>{this.state.api.login}</h1>
        <p>{this.state.text}</p>
    {/* <p>{this.componentWillUnmount()}</p> */}
            </div>
        )
    }
}

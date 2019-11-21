import React, { Component } from 'react'
import { withRouter } from "react-router-dom";


class Users extends Component {

    constructor(props){
        super(props)
        this.state = {
            match: props
        }
    }
    render() {
        return (
            <div>
                <p>ini users dengan name: {this.state.match}</p>
            </div>
        )
    }
}
export default withRouter(Users)
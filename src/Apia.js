import React, { Component } from 'react'

export default class Apia extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
         
        };
      }
    
       componentDidMount = () => {
        fetch(`https://api.github.com/users/miftahmfaris`)
          .then(Response => {
            return Response.json();
          })
          .then(data => {
            this.setState({ name: data.name });
            this.setState({ login  : data.login });
          });
      };
    render() {
        return (
            <div>
<h1>{this.state.name}</h1>
<h1>{this.state.login}</h1>

            </div>
        )
    }
}


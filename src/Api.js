import React, { Component } from 'react'

export default class Api extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
         
        };
      }
    
       componentDidMount = () => {
        fetch(`https://api.github.com/users/Amirullah23`)
          .then(Response => {
            return Response.json();
          })
          .then(data => {
            this.setState({ name: data.name })
            this.setState({ login  : data.login })
            this.setState({ datab  : data.url_login });

          });
      };
    render() {
        return (
            <div>
<h1>{this.state.name}</h1>
<h1>{this.state.login}</h1>
<h1>{this.state.datab}</h1>
<h1>{this.state.login}</h1>



            </div>
        )
    }
}

import React, { Component } from 'react'
import { withRouter } from "react-router-dom";

const Url = process.env.REACT_APP_PLACE


class Users extends Component {

    constructor(props){
        super(props)
        this.state = {
            post : [],
            forUsr : [],
            match : props.match.params.props
        }

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick = (thek) => {
        console.log(thek);
        

let abc = this.state.post.splice(thek, 1)
this.setState({
    post: abc
    
    
})
console.log(abc);



    }
  

    componentDidMount = () =>{
        fetch(`${Url}/posts`)
        .then(Response => {
          return Response.json();
        })
        .then(data => {
            const fix = data.filter(item=>(
                item.userId === parseInt(this.state.match)
            ))
            
      this.setState({post : fix})
}
         )
            console.log(parseInt(this.state.match));
                   
        }
    
    render() {
       

// console.log(lol);



        return (
            <div>
                    {this.state.post.map(item=>(
                        <React.Fragment>
    <h4>{item.title}</h4>
                    <p>{item.body}</p>
                    <button onClick={() => {this.handleClick(item.id)}}>Hapus{item.id}</button>
    </React.Fragment>
                    ))}
            </div>
        )
    }
}
export default withRouter(Users)
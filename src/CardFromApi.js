import React, { Component } from 'react'
import { Link } from "react-router-dom";

const Url = 'https://jsonplaceholder.typicode.com'


// import Axios from 'axios'


export default class CardFromApi extends Component {
    constructor(props){
        super(props)
        this.state = {
            api : [],
            post : []
        }
    }
    componentDidMount = () =>{

        // Axios.get('https://jsonplaceholder.typicode.com/users')
        // .then(response => {
        //     this.setState({api : response.data})
           
        // })
        
        

        fetch(`${Url}/users`)
        .then(Response => {
          return Response.json();
        })
        .then(data => {
         this.setState({api : data})
         

        });



        fetch(`${Url}/posts`)
        .then(Response => {
          return Response.json();
        })
        .then(data => {
         this.setState({post : data})
         

        });
        
        
    };
        
        
    


    render()
    {console.log(this.state.post);
    
       
        
        return (
           
            <div className="container">  
            <div className="row"> 
                {this.state.api.map((item , key)=> {
                    return (
                       
                    <div className="col-md-4" style={{width : 800}} key={key} >
                       <h3> <Link to={`/${item.id}`}>{item.name}</Link></h3>
                    <p>Email : {item.email}</p>
                    <p>Phone :{item.phone}</p>
                    <p>WebSite :{item.website}</p>
                    <p>Company :{item.company.name}</p>
                        </div>
                    )
                })}
                </div>
            </div>
        )
    }
}








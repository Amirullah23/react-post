import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";

const Url = process.env.REACT_APP_PLACE


class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: "",
            posts: [],
            match : props.match.params.props
        };
    }

    componentDidMount = () => {
        const {
            match: {
                params: { id }
            }
        } = this.props;

        this.setState({ id: id });

        axios
            .get(`${Url}/posts`)
            .then(response => {
                const filtered = response.data.filter(
                    item => item.userId === parseInt(this.state.match)
                );

                this.setState({ posts: filtered });
            })
            .catch(error => {
                console.log(error);
            });
    };

    deletePost = (postId, key) => {
        axios
            .delete(`${Url}/posts/${postId}`)
            .then(response => {
                if (response.status === 200) {
                    Swal.fire({
                        title: "Are you sure?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!"
                    }).then(result => {
                        if (result.value) {
                            Swal.fire(
                                "Deleted!",
                                `Your post with id: ${postId} is deleted.`,
                                "success"
                            );

                            let rest = this.state.posts;

                            rest.splice(key, 1);

                            this.setState({
                                posts: rest
                            });
                        }
                    });
                } else {
                    Swal.fire("There is something wrong", "error");
                }
            })
            .catch(error => {
                Swal.fire("There is something wrong", "error");
                console.log(error);
            });
    };

    editPost = async (postId, index) => {
        Swal.mixin({
            input: "text",
            confirmButtonText: "Next &rarr;",
            showCancelButton: true,
            progressSteps: ["1", "2"],
            inputValidator: value => {
                if (!value) {
                    return "You need to write something!";
                }
            }
        })
            .queue(["Edit Title", "Edit Body"])
            .then(result => {
                if (result.value) {
                    axios
                        .put(`${Url}/posts/${postId}`, {
                            title: result.value[0],
                            body: result.value[1]
                        })
                        .then(response => {
                            if (response.status === 200) {
                                Swal.fire({
                                    icon: "success",
                                    title: `Your post with id: ${postId} updated`,
                                    text: `title: ${response.data.title},  body: ${response.data.body}`
                                });
                            }

                            let rest = this.state.posts;

                            rest.splice(index, 1, {
                                title: result.value[0],
                                body: result.value[1]
                            });

                            this.setState({ posts: rest });
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            });
    };

    addPost = () => {
        Swal.mixin({
            input: "text",
            confirmButtonText: "Next &rarr;",
            showCancelButton: true,
            progressSteps: ["1", "2"],
            inputValidator: value => {
                if (!value) {
                    return "You need to write something!";
                }
            }
        })
            .queue(["Add Title", "Add Body"])
            .then(result => {
                if (result.value) {
                    axios
                        .post(`${Url}/posts`, {
                            title: result.value[0],
                            body: result.value[1]
                        })
                        .then(response => {
                            if (response.status === 201) {
                                Swal.fire({
                                    icon: "success",
                                    title: `Your new post is successfully added`,
                                    text: `title: ${response.data.title},  body: ${response.data.body}`
                                });
                                let rest = this.state.posts;

                                rest.push({
                                    id: rest.length + 1,
                                    title: result.value[0],
                                    body: result.value[1]
                                });

                                this.setState({ posts: rest });
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            });
    };

    render() {
        return (
            <div>
                <Button
                    onClick={() => {
                        this.addPost();
                    }}
                >
                    Add New Post
                </Button>
                {
                    this.state.posts.map((item, key) => {
                        return (
                            <List key={key}>
                                <ListItem alignItems="flex-start">
                                    <ListItemText
                                        primary={item.title}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    color="textPrimary"
                                                >
                                                    {item.body}
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                    <IconButton
                                        edge="end"
                                        aria-label="edit"
                                        onClick={() => {
                                            this.editPost(item.id, key);
                                        }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() => {
                                            this.deletePost(item.id, key);
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItem>
                                <Divider variant="middle" component="li" />
                            </List>
                        );
                    })}
            </div>
        );
    }
}

//     constructor(props){
//         super(props)
//         this.state = {
//             post : [],
//             forUsr : [],
//             match : props.match.params.props
//         }

//         this.handleClick = this.handleClick.bind(this)
//     }

//     handleClick = (thek) => {
//         console.log(thek);
      
//         axios
//         .delete(`${Url}/posts/${thek}`)
//         .then(response => {
//             if (response.status === 200) {
//                 Swal.fire({
//                     title: "Are you sure?",
//                     icon: "warning",
//                     showCancelButton: true,
//                     confirmButtonColor: "#3085d6",
//                     cancelButtonColor: "#d33",
//                     confirmButtonText: "Yes, delete it!"
//                 }).then(result => {
//                     if (result.value) {
//                         Swal.fire(
//                             "Deleted!",
//                             `Your post with id: ${thek} is deleted.`,
//                             "success"
//                         );

//                         let rest = this.state.posts;

//                         rest.splice(thek, 1);

//                         this.setState({
//                             posts: rest
//                         });
//                     }
//                 });
//             } else {
//                 Swal.fire("There is something wrong", "error");
//             }
//         })

// // let abc = this.state.post.splice(thek, 1)
// // this.setState({
// //     post: abc
    
    
// // })
// // console.log(abc);



//     }
  

//     componentDidMount = () =>{
//         fetch(`${Url}/posts`)
//         .then(Response => {
//           return Response.json();
//         })
//         .then(data => {
//             const fix = data.filter(item=>(
//                 item.userId === parseInt(this.state.match)
//             ))
            
//       this.setState({post : fix})
// }
//          )
//             console.log(parseInt(this.state.match));
                   
//         }
    
//     render() {
       

// // console.log(lol);



//         return (
//             <div>
//                     {this.state.post.map(item=>(
//                         <React.Fragment key={item.id}>
//     <h4>{item.title}</h4>
//                     <p>{item.body}</p>
//                     <button onClick={() => {this.handleClick(item.id)}}>Hapus this{item.id}</button>
//     </React.Fragment>
//                     ))}
//             </div>
//         )
//     }
// }
export default withRouter(Users)
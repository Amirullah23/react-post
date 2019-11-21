import React from "react";
// import logo from './logo.svg';
import "./App.css";
// import Api from './Api'
// import Apia from './Apia'
// import Mount from './Mount'
import Card from './CardFromApi'
// import Signup from './SignUp'

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Users from "./comp/Users";
// import NestedUser from "./comp/NestedUser";

export default function App() {
  return (
    <div className="App">
      {/* <Card /> */}
      {/* <Signup /> */}

      <Router>
        <Switch>
        <Route path="/" exact={true}>
            <Card />
          </Route>
          <Route path="/:props" exact={true}>
            <Users />
          </Route>
          {/* <Route path='/:name'>
            <NestedUser />
          </Route> */}
        </Switch>
      </Router>
    </div>
  );
}

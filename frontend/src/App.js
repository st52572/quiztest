import React from 'react';
import './App.css';
import {Navbar} from "./Components/Navbar"
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {ListTests} from "./Components/ListTests";
import {UserListTests} from "./Components/UserListTests";
import {Logout} from "./Components/Logout";
import {Test} from "./Components/Test";
import {Registration} from "./Components/Registration";
import {Login} from "./Components/Login";
import {CreateEditTest} from "./Components/CreateEditTest";

export class App extends React.Component {


    constructor(props) {
        super(props);
        this.state =
            {loggedIn: this.loggedIn()};
    }

    loggedIn=()=>
    {
        return !!localStorage.getItem("userInfo");

    };


    handleLogin=()=>{
        this.setState({loggedIn: true});
    };
    handleLogOut=()=>{
        this.setState({loggedIn: false});
    };

    render() {
        return (
            <div className="App">
                <Router>
                    <Navbar loggedIn={this.state.loggedIn}/>
                    <Switch>
                        <Route exact path="/registration" render={(props) => <Registration {...props} />}/>
                        <Route exact path="/login"  render={(props) => <Login onLog={this.handleLogin} {...props} />}/>
                        <Route exact path="/createTest" render={(props) => <CreateEditTest {...props} />}/>
                        <Route exact path="/tests" render={(props) => <ListTests {...props} />}/>
                        <Route exact path="/user-tests" render={(props) => <UserListTests {...props} />}/>
                        <Route exact path="/test-edit/:id" render={(props) => <CreateEditTest {...props} />}/>
                        <Route path="/logout" render={(props) => <Logout onLogOut={this.handleLogOut} {...props} />}/>
                        <Route path="/test/:id" render={(props) => <Test {...props} />}/>
                    </Switch>
                </Router>
            </div>
        );
    }


}
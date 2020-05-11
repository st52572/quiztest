import React from 'react';
import './App.css';
import {Navbar} from "./Components/Navbar"
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {CreateTest} from "./Components/CreateTest";
import {ListTests} from "./Components/ListTests";
import {UserListTests} from "./Components/UserListTests";
import {Logout} from "./Components/Logout";
import {Test} from "./Components/Test";
import {Registration} from "./Components/Registration";
import {Login} from "./Components/Login";
import {EditTest} from "./Components/EditTest";

export class App extends React.Component {

    render() {
        return (
            <div className="App">
                <Router>
                    <Navbar/>
                    <Switch>
                        <Route exact path="/registration">
                            <Registration/>
                        </Route>
                        <Route exact path="/login">
                            <Login/>
                        </Route>
                        <Route exact path="/createTest">
                            <CreateTest/>
                        </Route>
                        <Route exact path="/tests" render={(props) => <ListTests {...props} />}/>
                        <Route exact path="/user-tests" render={(props) => <UserListTests {...props} />}/>
                        <Route exact path="/test-edit/:id" render={(props) => <EditTest {...props} />}/>
                        <Route path="/logout">
                            <Logout/>
                        </Route>
                        <Route path="/test/:id" render={(props) => <Test {...props} />}/>
                    </Switch>
                </Router>
            </div>
        );
    }


}
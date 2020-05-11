import React from 'react';
import './App.css';
import {Navbar} from "./Components/Navbar"
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {CreateTest} from "./Components/CreateTest";
import {Tests} from "./Components/Tests";
import {UserTests} from "./Components/UserTests";
import {Logout} from "./Components/Logout";
import {Test} from "./Components/Test";
import {Registration} from "./Components/Registration";
import {Login} from "./Components/Login";

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
                        <Route exact path="/tests" render={(props) => <Tests {...props} />}/>
                        <Route exact path="/user-tests" render={(props) => <UserTests {...props} />}/>
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
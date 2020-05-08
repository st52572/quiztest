import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import {CreateTest} from "./CreateTest";
import {Tests} from "./Tests";
import {Logout} from "./Logout";
import {Test} from "./Test";
import {UserTests} from "./UserTests";
import React from "react";

export function NavbarLogged() {
    return (
        <Router>
            <div>
                <ul>
                    <li className="navbar-brand mb-0 h1">
                        <Link to="/createTest">CreateTest</Link>
                    </li>
                    <li className="navbar-brand mb-0 h1">
                        <Link to="/tests">Tests</Link>
                    </li>
                    <li className="navbar-brand mb-0 h1">
                        <Link to="/user-tests">User Tests</Link>
                    </li>
                    <li className="navbar-brand mb-0 h1">
                        <Link to="/logout">LogOut</Link>
                    </li>

                </ul>

                <hr/>
                <Switch>
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
            </div>
        </Router>

    );
}
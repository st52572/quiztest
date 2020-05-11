import {Link} from "react-router-dom";
import React from "react";

export function NavbarLogged() {
    return (
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
        </div>

    );
}
import {Link} from "react-router-dom";
import React from "react";

export function NavbarNotLogged() {
    return (
        <div>
            <ul>
                <li className="navbar-brand mb-0 h1">
                    <Link to="/registration">Register</Link>
                </li>
                <li className="navbar-brand mb-0 h1">
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        </div>
    );
}
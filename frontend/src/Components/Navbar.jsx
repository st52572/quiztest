import React from "react";
import {NavbarLogged} from "./NavbarLogged";
import {NavbarNotLogged} from "./NavbarNotLogged";

export class Navbar extends React.Component {


    render() {
        return (
            <nav className="navbar navbar-light bg-light">
                {this.props.loggedIn === true ? <NavbarLogged/> : <NavbarNotLogged/>}
            </nav>
        );
    }
}

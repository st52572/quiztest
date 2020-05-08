import React from "react";
import {NavbarLogged} from "./NavbarLogged";
import {NavbarNotLogged} from "./NavbarNotLogged";

export function Navbar() {

    return (
        <div className="App">
            <nav className="navbar navbar-light bg-light">
                {localStorage.getItem("userInfo") != null ? <NavbarLogged/> : <NavbarNotLogged/>}
            </nav>
        </div>
    );
}

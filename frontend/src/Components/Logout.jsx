import React from 'react';
import AuthService from "../service/AuthService";
import UserProfile from "./UserProfile";

export class Logout extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.logOut();
    }


    logOut = () => {
        AuthService.logOut().then(res => {
            if (res.data.status === 200) {
                localStorage.removeItem("userInfo");
                UserProfile.setId(null);
                UserProfile.setUsername(null);
                window.location.replace("/login");
            } else {
                this.setState({message: res.data.message});
            }
        });
    };



    render() {
        return <h1>LOGOUT</h1>;
    }


}
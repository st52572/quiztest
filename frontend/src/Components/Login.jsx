import React from 'react';
import {Input} from "./Input";
import AuthService from "../service/AuthService";
import UserProfile from "./UserProfile";
import FetchUtil from "../service/FetchUtil";

export class Login extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            logged: false,
            user: {}
        }
    }


    login = (e) => {
        e.preventDefault();
        const credentials = {username: this.state.user.username, password: this.state.user.password};
        FetchUtil.createFetchPostNoBearer({username: credentials.username}, 'http://localhost:8080/users/get')
            .then(response => response.json())
            .then(data => {
                UserProfile.setId(data.id);
                UserProfile.setUsername(data.username);
            });
        AuthService.login(credentials).then(res => {
            if (res.data.status === 200) {
                localStorage.setItem("userInfo", JSON.stringify(res.data.result));
            } else {
                this.setState({message: res.data.message});
            }
        });

    };


    change = (event) => {
        const tar = event.changing;
        this.setState(prevState => {
            let user = {...prevState.user};  // creating copy of state variable jasper
            user[tar] = event.text;                     // update the name property, assign a new value
            return {user};                                 // return new object jasper object
        })
    };


    render() {
        return (
            <form>
                <div className="form-group col-md-3">
                    <Input type={"text"} chaning={"username"} onChange={this.change} text={"username"}/>
                </div>
                <div className="form-group col-md-3">
                    <Input type={"current-password"} chaning={"password"} onChange={this.change} text={"password"}/>
                </div>
                <div className="form-group col-md-3">
                    <button className={"btn btn-dark"} onClick={this.login}>Login</button>
                </div>
            </form>
        )
    }


}
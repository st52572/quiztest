import React from 'react';
import {Input} from "./Input";
import AuthService from "../service/AuthService";
import UserProfile from "./UserProfile";
import FetchUtil from "../service/FetchUtil";
import Server from "../service/Server";

export class Login extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            logged: false,
            user: {}
        };
        this.login = this.login.bind(this);
    }


    login = (e) => {
        e.preventDefault();
        const credentials = {username: this.state.user.username, password: this.state.user.password};
        FetchUtil.createFetchPostNoBearer({username: credentials.username}, Server.getUrl() + 'users/get')
            .then(response => response.json())
            .then(data => {
                UserProfile.setId(data.id);
                UserProfile.setUsername(data.username);
            });
        console.log(credentials);
        AuthService.login(credentials).then(res => {
            if (res.data.status === 200) {
                localStorage.setItem("userInfo", JSON.stringify(res.data.result));
                this.props.onLog();
                this.props.history.push('/user-tests');

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
         <React.Fragment>
                <div className="form-group col-md-3">
                    <Input name={"username"} type={"text"} chaning={"username"} onChange={this.change} text={"username"}/>
                </div>
                <div className="form-group col-md-3">
                    <Input name={"password"} type={"current-password"} chaning={"password"} onChange={this.change} text={"password"}/>
                </div>
                <div className="form-group col-md-3">
                    <button className={"btn btn-dark btn-login"} onClick={this.login}>Login</button>
                </div>
         </React.Fragment>
        )
    }


}
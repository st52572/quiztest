import React from 'react';
import {Input} from "./Input";
import FetchUtil from "../service/FetchUtil";
import Server from "../service/Server";

export class Registration extends React.Component {


    constructor() {
        super();
        this.state = {user: {}}
    }

    register = (e) => {
        e.preventDefault();
        FetchUtil.createFetchPostNoBearer(this.state.user,Server.getUrl()+'users/add').then();
        this.props.history.push('/login');
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
                        <Input type={"text"} chaning={"firstName"} onChange={this.change} text={"firstName"}/>
                    </div>
                    <div className="form-group col-md-3">
                        <Input type={"text"} chaning={"lastName"} onChange={this.change} text={"lastName"}/>
                    </div>
                    <div className="form-group col-md-3">
                        <Input type={"text"} chaning={"username"} onChange={this.change} text={"username"}/>
                    </div>
                    <div className="form-group col-md-3">
                        <Input type={"password"} chaning={"password"} onChange={this.change} text={"password"}/>
                    </div>
                    <div className="form-group col-md-3">
                        <button className={"btn btn-dark"} onClick={this.register}>Registrovat</button>
                    </div>
                </form>
        )
    }


}
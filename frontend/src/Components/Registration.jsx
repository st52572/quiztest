import React from 'react';
import {Input} from "./Input";


export class Registration extends React.Component {


    constructor() {
        super();
        this.state = {user: {}}
    }

    register = (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state.user)
        };
        console.log(JSON.stringify(this.state.user));
        fetch('http://localhost:8080/users/add', requestOptions)
            .then();
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
            <div>
                <form>
                    <Input type={"text"} chaning={"firstName"} onChange={this.change} text={"firstName"}/>
                    <Input type={"text"} chaning={"lastName"} onChange={this.change} text={"lastName"}/>
                    <Input type={"text"} chaning={"username"} onChange={this.change} text={"username"}/>
                    <Input type={"password"} chaning={"password"} onChange={this.change} text={"password"}/>
                    <button className={"btn btn-dark"} onClick={this.register}>Registrovat</button>
                </form>
            </div>
        )
    }


}
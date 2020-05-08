import React from 'react';
import {Input} from "./Input";
import AuthService from "../service/AuthService";
import UserProfile from './UserProfile';


export class CreateTest extends React.Component {


    constructor(props) {
        super(props);
        if (localStorage.getItem("userInfo") == null) {
            window.location.replace("/login");
        }
        this.state = {
            count: 0,
            test: {
                name: "",
                questions: []
            }
        }
    }

    addQuestion = () => {
        this.setState(prevState => {
            let test = {...prevState.test};
            test.questions[this.state.count] = {question: "", answer: "", test: {}};
            return {test};
        });
        this.setState({count: this.state.count + 1});
    };

    changeName = (event) => {
        const tar = event.changing;
        this.setState(prevState => {
            let test = {...prevState.test};  // creating copy of state variable jasper
            test[tar] = event.text;                     // update the name property, assign a new value
            return {test};                            // return new object jasper object
        })
    };

    change = (event) => {
        const tar = event.changing;
        this.setState(prevState => {
            let test = {...prevState.test};  // creating copy of state variable jasper
            test.questions[event.index][tar] = event.text;                     // update the name property, assign a new value
            return {test};                            // return new object jasper object
        });
    };


    remove = (event, index) => {

        this.setState(prevState => {
            let test = {...prevState.test};
            for (let i = index; i < test.questions.length - 1; i++) {
                test.questions[i] = test.questions[i + 1];
            }
            test.questions.splice(test.questions.length - 1, 1);
            return {test};
        });

        this.setState({count: this.state.count - 1})
    };

    createTest = (e) => {
        e.preventDefault();
        const name = this.state.test.name;
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + AuthService.getUserInfo().token
            },
            body: JSON.stringify({name: name, user: {id: UserProfile.getId()}})
        };
        fetch('http://localhost:8080/tests/add', requestOptions)
            .then(response => response.json())
            .then(data => this.saveQuestions(data));
    };

    saveQuestions = (data) => {
        const testID = {id: data};
        for (let i = 0; i < this.state.test.questions.length; i++) {
            this.setState(prevState => {
                let test = {...prevState.test};
                test.questions[i].test = testID;
                return {test};
            })
        }
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + AuthService.getUserInfo().token
            },
            body: JSON.stringify(this.state.test.questions)
        };
        fetch('http://localhost:8080/questions/save', requestOptions)
            .then()
    };


    render() {
        return (
            <React.Fragment>
                <div>
                    <Input onChange={this.changeName} chaning={"name"} type={"text"} text={"Name of the test:"}
                           value={this.state.name}/>

                </div>
                <div>
                    <button className={"btn btn-dark"} onClick={this.addQuestion}>Add question</button>
                    <form>
                        {
                            this.state.test.questions.map((value, index) => <div key={index}>
                                <Input onChange={this.change} chaning={"question"} type={"text"} index={index}
                                       text={"Question:"} value={value.question}/>
                                <Input onChange={this.change} chaning={"answer"} type={"text"} index={index}
                                       text={"Answer:"} value={value.answer}/>
                                <button className={"btn btn-dark"}
                                        onClick={event => this.remove(event, index)}>Remove</button>
                                </div>
                            )
                        }
                        <button className={"btn btn-dark"} onClick={this.createTest}>Create Test</button>
                    </form>
                </div>
            </React.Fragment>
        )
    }


}
import React from 'react';
import {Input} from "./Input";
import AuthService from "../service/AuthService";


export class Test extends React.Component {


    constructor(props) {
        super(props);
        if (localStorage.getItem("userInfo") == null) {
            window.location.replace("/login");
        }
        this.state = {
            result: "",
            test: {
                questions: []
            }
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        const requestOptions = {
            method: 'GET',
            headers: {
                'accepts': 'application/json',
                Authorization: 'Bearer ' + AuthService.getUserInfo().token
            },
        };
        fetch('http://localhost:8080/questions/' + id, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({test: {questions: data}})
            });
    }


    changeAnswer = (answer) => {
        this.setState(prevState => {
            let test = {...prevState.test};  // creating copy of state variable jasper
            test.questions[answer.index].answer = answer.text;
            test.questions[answer.index].test = {id: this.props.match.params.id};
            return {test};                            // return new object jasper object
        })
    };

    sendTest = () =>{
        const test = this.state.test;
        console.log(JSON.stringify(test.questions));
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + AuthService.getUserInfo().token
            },
            body: JSON.stringify(test.questions)
        };
        fetch('http://localhost:8080/questions/checkTest', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({result: "Result of test: "+ data*100+"%"}));
    };

    render() {
        return (

                <div>
                    <label key={"result"}>{this.state.result}</label>
                    <div>
                        {
                            this.state.test.questions.map((value, index) => <div key={index}>
                                    <Input onChange={this.changeAnswer} type={"text"} index={index}
                                           text={"Question - "+value.question} value={value.answer}/>
                                </div>
                            )
                        }
                        <button className={"btn btn-dark"} onClick={this.sendTest}>Send test</button>
                    </div>
                </div>

        )
    }


}
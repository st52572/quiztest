import React from 'react';
import {Input} from "./Input";
import FetchUtil from "../service/FetchUtil";

export class Test extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            result: "",
            test: {
                questions: []
            }
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        fetch('http://localhost:8080/questions/' + id, FetchUtil.createFetchGet())
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
        fetch('http://localhost:8080/questions/checkTest', FetchUtil.createFetchPost(test.questions))
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
import React from 'react';
import {Input} from "./Input";
import UserProfile from './UserProfile';
import FetchUtil from "../service/FetchUtil";


export class CreateTest extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            test: {
                tag: "",
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

    changeI = (event) => {
        const tar = event.changing;
        this.setState(prevState => {
            let test = {...prevState.test};
            test[tar] = event.text;
            return {test};
        })
    };

    change = (event) => {
        const tar = event.changing;
        this.setState(prevState => {
            let test = {...prevState.test};
            test.questions[event.index][tar] = event.text;
            return {test};
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
        FetchUtil.createFetchPost({
            tag: this.state.test.tag,
            name: this.state.test.name,
            user: {id: UserProfile.getId()}
        }, 'http://localhost:8080/tests/add')
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
        FetchUtil.createFetchPost(this.state.test.questions,'http://localhost:8080/questions/save').then();
    };


    render() {
        return (
            <React.Fragment>
                <div className="form-group col-md-3">
                    <Input onChange={this.changeI} chaning={"tag"} type={"text"} text={"Tag of the test:"}
                           value={this.state.test.tag}/>
                    <Input onChange={this.changeI} chaning={"name"} type={"text"} text={"Name of the test:"}
                           value={this.state.test.name}/>
                    <button className={"btn btn-dark"} onClick={this.addQuestion}>Add question</button>
                    <button className={"btn btn-dark m-3"} onClick={this.createTest}>Create Test</button>
                </div>
                <div>
                    <div className="row">
                        {

                            this.state.test.questions.map((value, index) =>
                                <div key={index} className="form-group col-md-3 border">
                                    <div className={"m-2"}>
                                        <Input onChange={this.change} chaning={"question"} type={"text"}
                                               index={index}
                                               text={"Question:"} value={value.question}/>

                                        <Input onChange={this.change} chaning={"answer"} type={"text"} index={index}
                                               text={"Answer:"} value={value.answer}/>
                                        <button className={"btn btn-dark mt-2"}
                                                onClick={event => this.remove(event, index)}>Remove
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                    </div>

                </div>
            </React.Fragment>
        )
    }


}
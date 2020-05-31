import React from 'react';
import UserProfile from './UserProfile';
import FetchUtil from "../service/FetchUtil";
import Server from "../service/Server";
import {CreateTest} from "./CreateTest";
import {EditTest} from "./EditTest";


export class CreateEditTest extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            tag: "",
            name: "",
            questions: []

        };

    }

    addQuestion = () => {
        this.setState(prevState => {
            let questions = [...prevState.questions, {question: "", answer: ""}];
            return {questions};
        });
    };

    changeValue = (event) => {
        const target = event.changing;
        this.setState({[target]: event.text});
    };

    change = (event) => {
        const target = event.changing;
        this.setState(prevState => {
            let questions = [...prevState.questions];
            questions[event.index][target] = event.text;
            return {questions};
        });
    };


    removeCreate = (index) => {
        this.removeFromQuestions(index);
    };

    removeEdit = (index, id) => {

        if (id) {
            const url = Server.getUrl()+'questions/deleteQuestion/' + id;
            FetchUtil.createFetchPost(null, url).then(() => this.load());
        } else {
            this.removeFromQuestions(index);
        }
    };

    removeFromQuestions = (index) => {
        this.setState(prevState => {
            let questions = [...prevState.questions];
            for (let i = index; i < questions.length - 1; i++) {
                questions[i] = questions[i + 1];
            }
            questions.pop();
            return {questions};
        });
    };

    saveTest = () => {
        FetchUtil.createFetchPost({
            id: this.props.match.params.id,
            tag: this.state.tag,
            name: this.state.name,
            user: {id: UserProfile.getId()},
            questions: this.state.questions
        }, Server.getUrl()+'tests/addTest')
            .then();

    };


    load = () => {
        const id = this.props.match.params.id;
        FetchUtil.createFetchGet(Server.getUrl()+'tests/getTest/' + id)
            .then(response => response.json())
            .then(data => this.setState({
                tag: data.tag,
                name: data.name,
                questions: data.questions
            }));

    };


    render() {
        return (
            <React.Fragment>
                {this.props.location.pathname === "/createTest" ?
                    <CreateTest changeValue={this.changeValue} tag={this.state.tag} name={this.state.name}
                                addQuestion={this.addQuestion} saveTest={this.saveTest} change={this.change}
                                questions={this.state.questions}
                                remove={this.removeCreate}/>
                                :
                    <EditTest changeValue={this.changeValue} tag={this.state.tag} name={this.state.name}
                                addQuestion={this.addQuestion} saveTest={this.saveTest} change={this.change}
                                questions={this.state.questions}
                                remove={this.removeEdit} load={this.load}/>
                }


            </React.Fragment>
        )
    }


}
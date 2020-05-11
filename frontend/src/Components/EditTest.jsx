import React from 'react';
import {Input} from "./Input";
import FetchUtil from "../service/FetchUtil";
import UserProfile from "./UserProfile";


export class EditTest extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            name: "",
            test: {
                name: "",
                questions: []
            }
        }
    }

    componentDidMount() {
        this.load();
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
            let test = {...prevState.test};
            test[tar] = event.text;
            return {test};
        });
        this.setState({name: event.text});
    };

    change = (event) => {
        const tar = event.changing;
        this.setState(prevState => {
            let test = {...prevState.test};
            test.questions[event.index][tar] = event.text;
            return {test};
        });
    };

    load =()=>{
        const id = this.props.match.params.id;
        FetchUtil.createFetchGet('http://localhost:8080/tests/'+id)
            .then(response => response.json())
            .then(data => this.setState({name: data.name}));



        const url = 'http://localhost:8080/questions/all/'+id;
        FetchUtil.createFetchGet(url)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    test: {
                        questions: data
                    },
                    count: data.length
                })
            });
    };

    remove = (event, id, index) => {


        if(id) {
            const url = 'http://localhost:8080/questions/delete/' + id;
            FetchUtil.createFetchPost(null, url).then(value => this.load());
        }else {
            this.setState(prevState => {
                let test = {...prevState.test};
                for (let i = index; i < test.questions.length - 1; i++) {
                    test.questions[i] = test.questions[i + 1];
                }
                test.questions.splice(test.questions.length - 1, 1);
                return {test};
            });

            this.setState({count: this.state.count - 1})
        }
    };



    saveTest = async () => {

        FetchUtil.createFetchPost({
            id: this.props.match.params.id,
            name: this.state.test.name,
            user: {id: UserProfile.getId()}
        }, 'http://localhost:8080/tests/add').then();


        const testID = {id: this.props.match.params.id};
        /*let test = {...this.state.test};
        for (let i = 0; i < this.state.test.questions.length; i++) {
            test.questions[i].test = testID;
        }*/

        for (let i = 0; i < this.state.test.questions.length; i++) {
            await this.setState(prevState => {
                let test = {...prevState.test};
                test.questions[i].test = testID;
                console.log(test.questions[i]);
                return {test};
            })
        }
        console.log(JSON.stringify(this.state.test.questions));
        FetchUtil.createFetchPost(this.state.test.questions, 'http://localhost:8080/questions/save').then(value => this.load());
    };


    render() {
        return (
            <React.Fragment>
                <div className="form-group col-md-3">
                    <Input onChange={this.changeName} chaning={"name"} type={"text"} text={"Name of the test:"}
                           value={this.state.name}/>
                    <button className={"btn btn-dark"} onClick={this.addQuestion}>Add question</button>
                    <button className={"btn btn-dark m-3"} onClick={this.saveTest}>Save Test</button>
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
                                                onClick={event => this.remove(event, value.id, index)}>Remove
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
import React from 'react';
import {Input} from "./Input";
import FetchUtil from "../service/FetchUtil";
import {PaginationComponent} from "./PaginationComponent";

export class Test extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            result: "",
            allTests: {
                questions: []
            },
            test: {
                questions: []
            },
            activePage: 0,
            totalPages: 0,
            itemsCountPerPage: 0,
            totalItemsCount: 0,
            pageSize: 4,
            loadedPages: []
        };

    }

    componentDidMount() {
        this.fetchURL(0);

    }

    fetchURL = (page) => {
        if (!this.state.loadedPages.includes(page)) {
            this.setState({loadedPages: [...this.state.loadedPages, page]});
            const id = this.props.match.params.id;
            FetchUtil.createFetchGet('http://localhost:8080/questions/' + id + '?page=' + page + '&size=' + this.state.pageSize)
                .then(response => response.json())
                .then(data => {
                    this.setState({

                        allTests: {questions: this.state.allTests.questions.concat(data.content)},
                        test: {questions: data.content},
                        page: data,
                        totalPages: data.totalPages,
                        itemsCountPerPage: data.size,
                        totalItemsCount: data.totalElements
                    })
                });
        } else {
            let array = [];
            let i;
            let index = 0;
            const lowerBound = page * this.state.itemsCountPerPage;
            const upperBound = page * this.state.itemsCountPerPage + this.state.pageSize;
            for (i = lowerBound; i < upperBound && i < this.state.totalItemsCount; i++) {
                array[index++] = this.state.allTests.questions[i];
            }
            this.setState({
                test: {questions: array}
            })
        }

    };


    changeAnswer = (answer) => {
        this.setState(prevState => {
            let test = {...prevState.test};  // creating copy of state variable jasper
            test.questions[answer.index].answer = answer.text;
            test.questions[answer.index].test = {id: this.props.match.params.id};
            return {test};                            // return new object jasper object
        })
    };

    sendTest = () => {
        const test = this.state.allTests;
        FetchUtil.createFetchPost(test.questions, 'http://localhost:8080/questions/checkTest')
            .then(response => response.json())
            .then(data => this.setState({result: "Result of test: " + data * 100 + "%"}));
    };

    handlePageChange = (page) => {
        page = page - 1;
        this.setState({activePage: page});
        this.fetchURL(page)

    };

    render() {
        return (

            <div className="form-group col-3">
                <label key={"result"}>{this.state.result}</label>
                <div>
                    {
                        this.state.test.questions.map((value, index) => <div className={"border p-2"} key={index}>
                            <label>{"Question - " + value.question}</label>
                            <Input onChange={this.changeAnswer} type={"text"} index={index}
                                       text={"Answer"} value={value.answer}/>
                            </div>
                        )
                    }

                    <PaginationComponent activePage={this.state.activePage}
                                         itemsCountPerPage={this.state.itemsCountPerPage}
                                         totalItemsCount={this.state.totalItemsCount}
                                         handlePageChange={this.handlePageChange}/>
                    <button className={"btn btn-dark mt-2"} onClick={this.sendTest}>Send test</button>
                </div>
            </div>

        )
    }


}
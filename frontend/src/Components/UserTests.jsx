import React from 'react';
import AuthService from "../service/AuthService";
import Pagination from "react-js-pagination";
import {Input} from "./Input";
import UserProfile from "./UserProfile";


export class UserTests extends React.Component {


    constructor(props) {
        super(props);
        if (localStorage.getItem("userInfo") == null) {
            this.props.history.push('/login');
        }

        this.state = {
            filter: "",
            activePage: 0,
            totalPages: 0,
            itemsCountPerPage: 0,
            totalItemsCount: 0,
            tests: []
        };

        this.handlePageChange = this.handlePageChange.bind(this);
        this.fetchURL = this.fetchURL.bind(this);
    }

    componentDidMount() {
        this.fetchURL(this.state.activePage);
    }

    fetchURL(page, filter) {
        const id = UserProfile.getId();
        let url = 'http://localhost:8080/tests/user/' + id + '?page=' + page + '&size=5';
        if (filter) {
            url = 'http://localhost:8080/tests/user/' + id + '/' + filter + '?page=' + page + '&size=5';
        }
        const requestOptions = {
            method: 'POST',
            headers: {
                'accepts': 'application/json',
                Authorization: 'Bearer ' + AuthService.getUserInfo().token
            },
        };
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => this.setState({
                page: data,
                tests: data.content,
                activePage: 1,
                totalPages: data.totalPages,
                itemsCountPerPage: data.size,
                totalItemsCount: data.totalElements
            }));
    }

    changeFilter = (filter) => {
        this.setState({filter: filter.text});
        this.fetchURL(0, filter.text);
    };

    handlePageChange(page) {
        page = page - 1;
        this.setState({activePage: page});
        this.fetchURL(page, this.state.filter)

    }

    onDelete = (id) => {

        let url = 'http://localhost:8080/tests/delete/' + id;
        const requestOptions = {
            method: 'POST',
            headers: {
                'accepts': 'application/json',
                Authorization: 'Bearer ' + AuthService.getUserInfo().token
            },
        };
        fetch(url, requestOptions).then(value => this.fetchURL(0, this.state.filter));
    };

    render() {
        return (
            <React.Fragment>
                <div>
                    <Input type={"text"} onChange={this.changeFilter} text={"Filter"} value={this.state.filter}/>
                </div>
                <div>
                    {
                        this.state.tests.map((value, index) => <div key={index}>
                                <h4>Test: {value.name}</h4>
                                <button className={"btn btn-danger"}
                                        onClick={event => this.onDelete(value.id)}>Delete
                                </button>
                            </div>
                        )
                    }

                    <div className="d-flex justify-content-center">
                        <Pagination hideNavigation
                                    hideFirstLastPages
                                    activePage={this.state.activePage}
                                    itemsCountPerPage={this.state.itemsCountPerPage}
                                    totalItemsCount={this.state.totalItemsCount}
                                    pageRangeDisplayed={5}
                                    itemClass='page-item'
                                    linkClass='btn btn-light'
                                    onChange={this.handlePageChange}
                        />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


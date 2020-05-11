import React from 'react';
import AuthService from "../service/AuthService";
import Pagination from "react-js-pagination";
import {Input} from "./Input";


export class Tests extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            filter: "",
            activePage: 0,
            totalPages: 0,
            itemsCountPerPage: 0,
            totalItemsCount: 0,
            tests: [],
            pageSize: 4
        };

        this.handlePageChange = this.handlePageChange.bind(this);
        this.fetchURL = this.fetchURL.bind(this);
    }

    componentDidMount() {
        this.fetchURL(this.state.activePage);
    }

    fetchURL(page, filter) {
        let url = 'http://localhost:8080/tests?page=' + page + '&size='+this.state.pageSize;
        if (filter) {
            url = 'http://localhost:8080/tests/' + filter + '?page=' + page + '&size='+this.state.pageSize;
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

    render() {
        return (
            <React.Fragment>
                <div className="form-group col-md-3">
                    <Input type={"text"} onChange={this.changeFilter} text={"Filter"} value={this.state.filter}/>
                </div>
                <div className="form-group ml-3">
                    {
                        this.state.tests.map((value, index) => <div className="form-group col-md-3 p-2 mt-3 border" key={index}>
                                <h4>Test: {value.name}</h4>
                            <button className={"btn btn-dark"}
                                    onClick={event => window.location.replace("/test/" + value.id)}>Start test
                            </button>
                            </div>
                        )
                    }

                    <div className="form-group col-md-3 p-2 mt-3">
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


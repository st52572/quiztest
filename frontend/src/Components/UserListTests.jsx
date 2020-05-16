import React from 'react';
import Pagination from "react-js-pagination";
import {Input} from "./Input";
import UserProfile from "./UserProfile";
import FetchUtil from "../service/FetchUtil";
import {Link} from "react-router-dom";

export class UserListTests extends React.Component {


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
        const id = UserProfile.getId();
        let url = 'http://localhost:8080/tests/user/' + id + '?page=' + page + '&size='+this.state.pageSize;
        if (filter) {
            url = 'http://localhost:8080/tests/user/filtered/' + id + '?page=' + page + '&size='+this.state.pageSize;
        }
        FetchUtil.createFetchPost({filter},url)
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

    onDelete = (id) => {
        let url = 'http://localhost:8080/tests/delete/' + id;
        FetchUtil.createFetchPost(null, url)
        .then(value => this.fetchURL(0, this.state.filter));
    };

    render() {
        return (
            <React.Fragment>
                <div className="form-group col-md-3">
                    <Input type={"text"} onChange={this.changeFilter} text={"Filter"} value={this.state.filter}/>
                </div>
                <div className="form-group ml-3">
                    {
                        this.state.tests.map((value, index) => <div className="form-group col-md-3 p-2 mt-3 border" key={index}>
                                <h4>{value.tag}: {value.name}</h4>
                                <button className={"btn btn-danger"}
                                        onClick={event => this.onDelete(value.id)}>Delete
                                </button>
                                <Link className={"btn btn-dark ml-2"} to={"/test-edit/" + value.id} >Edit test</Link>
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


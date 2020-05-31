import React from 'react';
import UserProfile from "./UserProfile";
import FetchUtil from "../service/FetchUtil";
import {FilterComponent} from "./FilterComponent";
import {PaginationComponent} from "./PaginationComponent";
import {TestComponent} from "./TestComponent";
import Server from "../service/Server";

export class UserListTests extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            tests: [],
            filter: "",
            activePage: 0,
            totalPages: 0,
            itemsCountPerPage: 0,
            totalItemsCount: 0,
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
        let url = Server.getUrl()+'tests/getUserTests/' + id + '?page=' + page + '&size=' + this.state.pageSize;
        if (filter) {
            url = Server.getUrl()+'tests/getUserTestsFiltered/' + id + '?page=' + page + '&size=' + this.state.pageSize;
        }
        FetchUtil.createFetchPost({filter}, url)
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
        let url = Server.getUrl()+'tests/deleteTest/' + id;
        FetchUtil.createFetchPost(null, url)
            .then(() => this.fetchURL(0, this.state.filter));
    };

    render() {
        return (
            <React.Fragment>
                <h2>Yours tests</h2>
                <FilterComponent changeFilter={this.changeFilter} filter={this.state.filter}/>
                <div className="form-group ml-3">
                    <TestComponent onDelete={this.onDelete} editMode={true} tests={this.state.tests}/>
                    <PaginationComponent activePage={this.state.activePage}
                                         itemsCountPerPage={this.state.itemsCountPerPage}
                                         totalItemsCount={this.state.totalItemsCount}
                                         handlePageChange={this.handlePageChange}/>
                </div>
            </React.Fragment>
        )
    }
}


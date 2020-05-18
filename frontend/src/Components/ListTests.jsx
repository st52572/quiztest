import React from 'react';
import FetchUtil from "../service/FetchUtil";
import {TestComponent} from "./TestComponent";
import {PaginationComponent} from "./PaginationComponent";
import {FilterComponent} from "./FilterComponent";
import Server from "../service/FetchUtil";

export class ListTests extends React.Component {


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
        let url = Server.getUrl+'tests?page=' + page + '&size=' + this.state.pageSize;
        if (filter) {
            url = Server.getUrl+'tests/filtered?page=' + page + '&size=' + this.state.pageSize;
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

    render() {
        return (
            <React.Fragment>
                <FilterComponent changeFilter={this.changeFilter} filter={this.state.filter}/>
                <div className="form-group ml-3">
                    <TestComponent editMode={false} tests={this.state.tests}/>
                    <PaginationComponent activePage={this.state.activePage}
                                         itemsCountPerPage={this.state.itemsCountPerPage}
                                         totalItemsCount={this.state.totalItemsCount}
                                         handlePageChange={this.handlePageChange}/>

                </div>
            </React.Fragment>
        )
    }
}


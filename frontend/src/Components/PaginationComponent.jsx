import React from 'react';
import Pagination from "react-js-pagination";



export class PaginationComponent extends React.Component {



    render() {
        return (
            <div className="form-group col-md-3 p-2 mt-3">
                <Pagination hideNavigation
                            hideFirstLastPages
                            activePage={this.props.activePage}
                            itemsCountPerPage={this.props.itemsCountPerPage}
                            totalItemsCount={this.props.totalItemsCount}
                            pageRangeDisplayed={5}
                            itemClass='page-item'
                            linkClass='btn btn-light'
                            onChange={this.props.handlePageChange}
                />
            </div>
        )
    }


}
import React from 'react';
import {Link} from "react-router-dom";


export class TestComponent extends React.Component {


    render() {
        return (
            this.props.tests.map((value, index) => <div className="form-group col-md-3 p-2 mt-3 border"
                                                        key={index}>
                    <h4>{value.tag}: {value.name}</h4>
                    {
                        this.props.editMode === false ?
                            <Link className={"btn btn-dark"} to={"/test/" + value.id}>Start test</Link>
                            :
                            <React.Fragment>
                                <button className={"btn btn-danger"}
                                        onClick={this.props.onDelete(value.id)}>Delete
                                </button>
                                <Link className={"btn btn-dark ml-2"} to={"/test-edit/" + value.id}>Edit test</Link>
                            </React.Fragment>
                    }


                </div>
            )
        )
    }


}
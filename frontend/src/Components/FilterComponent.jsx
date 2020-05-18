import React from 'react';
import {Input} from "./Input";


export class FilterComponent extends React.Component {


    render() {
        return (
            <div className="form-group col-md-3">
                <Input type={"text"} onChange={this.props.changeFilter} text={"Filter"} value={this.props.filter}/>
            </div>
        )
    }


}
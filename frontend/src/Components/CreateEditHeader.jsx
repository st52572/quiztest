import React from "react";
import {Input} from "./Input";

export class CreateEditHeader extends React.Component {

    render() {
        return (
            <div className="form-group col-md-3">
                <Input onChange={this.props.changeValue} chaning={"tag"} type={"text"} text={"Tag of the test:"}
                       value={this.props.tag}/>
                <Input onChange={this.props.changeValue} chaning={"name"} type={"text"} text={"Name of the test:"}
                       value={this.props.name}/>
                <button className={"btn btn-dark"} onClick={this.props.addQuestion}>Add question</button>
                <button className={"btn btn-dark m-3"} onClick={this.props.saveTest}>Save Test</button>
            </div>

        );
    }
}
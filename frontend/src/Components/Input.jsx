import React from 'react';

export class Input extends React.Component {

    handleChange = (event) => {
        let index = 0;
        let changing = null;
        if (this.props.index) {
            index = this.props.index;
        }
        if (this.props.chaning) {
            changing = this.props.chaning;
        }
        this.props.onChange({index: index, changing: changing, text: event.target.value})
    };

    render() {
        return (
            <React.Fragment>
                <div className="input-group-prepend mt-2">
                    <span className="input-group-text" id="basic-addon1">{this.props.text}</span>
                </div>
                <input name={this.props.name} className={"form-control"} type={this.props.type} onChange={this.handleChange}
                       value={this.props.value}/>
            </React.Fragment>
        )
    }


}
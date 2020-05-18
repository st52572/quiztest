import React from 'react';
import {CreateEditBody} from "./CreateEditBody";
import {CreateEditHeader} from "./CreateEditHeader";


export class EditTest extends React.Component {

    componentDidMount() {
        this.props.load();
    }


    render() {
        return (
            <React.Fragment>
                <CreateEditHeader changeValue={this.props.changeValue} tag={this.props.tag} name={this.props.name}
                                  addQuestion={this.props.addQuestion} saveTest={this.props.saveTest}/>
                <div>
                    <div className="row">
                        <CreateEditBody change={this.props.change} questions={this.props.questions}
                                        remove={this.props.remove}/>
                    </div>

                </div>
            </React.Fragment>
        )
    }


}
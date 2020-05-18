import React from 'react';
import {CreateEditHeader} from "./CreateEditHeader";
import {CreateEditBody} from "./CreateEditBody";


export class CreateTest extends React.Component {



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
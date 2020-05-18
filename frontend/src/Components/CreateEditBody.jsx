import React from "react";
import {Input} from "./Input";

export class CreateEditBody extends React.Component {


    render() {
        return (
            <React.Fragment>
            {
                this.props.questions.map((value, index) =>
                    <div key={index} className="form-group col-md-3 border">
                        <div className={"m-2"}>
                            <Input onChange={this.props.change} chaning={"question"} type={"text"}
                                   index={index}
                                   text={"Question:"} value={value.question}/>

                            <Input onChange={this.props.change} chaning={"answer"} type={"text"} index={index}
                                   text={"Answer:"} value={value.answer}/>
                            <button className={"btn btn-dark mt-2"}
                                    onClick={
                                        this.props.remove(index,value.id)
                                    }>Remove
                            </button>
                        </div>
                    </div>
                )
            }
            </React.Fragment>


        );
    }
}
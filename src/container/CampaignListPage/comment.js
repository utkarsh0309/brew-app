import React from'react';
import { StyledInput, StyledSelect, Button, H3 } from '../../style';

export default class CommentForm extends React.Component{

    state = {
        userName:"",
        comment: ""
    }

    formChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    submit = () => {
        this.props.submitComment(this.state.userName, this.state.comment)
    }

    render = () => {
        return(
            <div>
                <H3>User</H3><br/>
                <StyledInput name="userName" value={this.state.userName} placeholder="User Name" onChange={(event) => this.formChange(event)}/><br/><br/>
                <H3>Comment</H3><br/>
                <StyledInput name="comment" value={this.state.comment} placeholder="Comment" onChange={(event) => this.formChange(event)}/><br/><br/>
                <div style={{textAlign:"center"}}><Button onClick={() => this.submit()}>Submit</Button></div>
            </div>
        )
    }
}
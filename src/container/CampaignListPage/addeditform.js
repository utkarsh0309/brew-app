import React from 'react';
import { StyledInput, StyledSelect, Button } from '../../style';
import { CAMPAIGN_TYPE } from '../../constants/CampaignType';

export default class AddEditForm extends React.Component{

    state = {
        name: "",
        type: "",
        start: false
    }

    formChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render = () => (
        <form>
            <h3>Campaign Name</h3>
            <StyledInput name="name" value={this.state.name} placeholder="Name" onChange={(event) => this.formChange(event)}/><br/>
            <h3>Campaign Type</h3>
            <StyledSelect name="type" onChange={(event) => this.formChange(event)}>
                {
                    Object.keys(CAMPAIGN_TYPE).map((index) => {
                        return <option key={index} value={CAMPAIGN_TYPE[index]}>{index}</option>
                    })
                }
            </StyledSelect><br/><br/>
            <input type="checkbox" name="start"/> Campaign Starts on Create<br/><br/>
            <div style={{margin:"auto", textAlign:"center"}}><Button style={{margin:"0px auto;"}} onClick={() => this.props.submit(this.state)}>Submit</Button></div>
        </form>
    )

}
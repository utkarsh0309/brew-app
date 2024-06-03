import React from 'react';
import { IoIosPlay, IoIosPause, IoIosText, IoIosCreate, IoIosTrash } from 'react-icons/io';
import styled from 'styled-components';

import { DialogBox } from '../../components/DialogBox';
import Campaign from '../../models/Campaign';
import { CAMPAIGN_TYPE } from '../../constants/CampaignType';
import AddEditForm from './addeditform';
import { CAMPAIGN_STATE } from '../../constants/CampaignStates';

import { Row, Grid1, Grid2, Grid4, Grid6, Grid8, Button, H1, H2, H3, Container } from '../../style';
import { CAMPAIGN_ACTIONS } from '../../constants/CampaignActions';
import * as Actions  from './actions';
import CommentForm from './comment';

const Card = styled.div`
    display: flex;
    flex-direction: row;
    border:1px solid #00000020;
    border-radius: 2px;
    padding:20px;
    width:94.1%;
    box-shadow: 2px 2px 4px #00000020;
    background: white;
    margin: 5px auto;
    &:focus {outline:0 !important;}
    `

const SelectedCard = styled.div`
    display: flex;
    flex-direction: row;
    border-radius: 2px;
    padding:20px;
    width:98.5%;
    box-shadow: 2px 2px 4px grey;
    background: #D4F4DD;
    margin: 5px auto;
    &:focus {outline:0 !important;}
    `


export default class CampaignListPage extends React.Component {

    state = {
        campaignList: [],
        selectedCampaign: null,
        displayingCampaigns: [],
        pageNumber: 0,
        showDialogue: false,
        comment: false
    }

    openAddDialog = () => {
        this.setState({
            showDialogue: true,
            comment: false
        })
    }

    closeDialog = () =>{
        this.setState({
            showDialogue: false
        })
    } 

    submit = (form) => {
        let tempCampaignList = this.state.campaignList;
        let newCampaign = null;

        if(form.start)
            newCampaign = new Campaign(form.name, form.type, form.start);
        else
            newCampaign = new Campaign(form.name, form.type, CAMPAIGN_STATE.RUNNING);

        tempCampaignList.push(newCampaign)
        this.setState({
            campaignList: tempCampaignList,
            displayingCampaigns: tempCampaignList,
            showDialogue: false
        })
    }

    select = (selectedCampaign, selectedIndex) => {
        this.setState({
            selectedCampaign,
            selectedIndex
        })
    }

    submitComment = (userName, comment) => {
        let tempList = this.state.campaignList;
        let campaign = Actions.addComment(tempList[this.state.selectedIndex], userName, comment);
        tempList[this.state.selectedIndex] = campaign;
        this.setState({
            campaignList: tempList,
            showDialogue: false
        })
    }

    selectCampaign = (event) =>{
        let target = event.target;
        let index = 0;
        while(target.tagName!=='LI'){
            target = target.parentElement;
        }
        index = target.tabIndex;
        let action = 0;
        console.log(index);
        if(event.target.tagName === 'path'){
            action = parseInt(event.target.parentElement.getAttribute('data-action'));
        }
        else{
            action = parseInt(event.target.getAttribute('data-action'));
        }
        
        let temp = null;
        
        this.select(this.state.campaignList[index], index)
        switch(action){
            case CAMPAIGN_ACTIONS.START:
            case CAMPAIGN_ACTIONS.PAUSE:
                temp = Actions.changeCampaignState(this.state.campaignList, index)
                break;              
            case CAMPAIGN_ACTIONS.COMMENT:
                this.setState({
                    showDialogue: true,
                    comment: true,
                })
                break;
            case CAMPAIGN_ACTIONS.DELETE:
                temp = Actions.removeCampaign(this.state.campaignList, index)
                break;      
        }
        if(temp!==null)
            this.setState({
                campaignList: temp
            })

    }

    render = () => {
        return(
            <div style={{background:"#A9CEF4",height:"100vh"}}>
                { 
                    this.state.showDialogue && <DialogBox
                        closeDialog={this.closeDialog}
                        >
                        <p></p>
                        {
                            (!this.state.comment)?
                            <AddEditForm
                                submit={this.submit}
                                />
                            :<CommentForm
                                selectedCampaign={this.state.selectedCampaign}
                                submitComment={this.submitComment}
                                />
                        }
                    </DialogBox>
                }
                <br/>
                <Container>
                    <Row>
                        <Grid2>
                            <H1 style={{color:"#00000099",margin:"0px auto"}}>Campaigns</H1>
                        </Grid2>
                        <Grid2>
                            <Button style={{marginTop:"10px"}} onClick={() => this.openAddDialog()}>Create Campaign</Button>
                        </Grid2>
                    </Row>
                    <br/>
                    <br/>
                    <Row style={{minHeight:"70%",height:"auto"}}>
                        <Grid8 style={{minHeight:"100%"}}>
                            <ul onClick={(event) => this.selectCampaign(event)} style={{margin:"0px",padding:"0px"}}>
                            {
                                this.state.campaignList && this.state.campaignList.map((campaign, index) => {
                                        return (
                                            <li tabIndex={index} style={{listStyle:'none',"&:focus":"outline:0 !important"}}>
                                                {
                                                    (index===this.state.selectedIndex)?
                                                    <SelectedCard>
                                                        <Grid6><H3 key={campaign}  data-action={CAMPAIGN_ACTIONS.SELECT}>{campaign.name}</H3></Grid6>
                                                        <Grid1>{(campaign.state===CAMPAIGN_STATE.RUNNING)?<IoIosPause data-action={CAMPAIGN_ACTIONS.START}/>:<IoIosPlay data-action={CAMPAIGN_ACTIONS.PAUSE}/>}</Grid1>
                                                        <Grid1><IoIosText data-action={CAMPAIGN_ACTIONS.COMMENT} /></Grid1>
                                                        <Grid1><IoIosCreate  data-action={CAMPAIGN_ACTIONS.EDIT}/></Grid1>
                                                        <Grid1><IoIosTrash data-action={CAMPAIGN_ACTIONS.DELETE}/></Grid1>
                                                    </SelectedCard>
                                                    :
                                                    <Card>
                                                        <Grid6><H3 key={campaign}  data-action={CAMPAIGN_ACTIONS.SELECT}>{campaign.name}</H3></Grid6>
                                                        <Grid1>{(campaign.state===CAMPAIGN_STATE.RUNNING)?<IoIosPause data-action={CAMPAIGN_ACTIONS.START}/>:<IoIosPlay data-action={CAMPAIGN_ACTIONS.PAUSE}/>}</Grid1>
                                                        <Grid1><IoIosText data-action={CAMPAIGN_ACTIONS.COMMENT} /></Grid1>
                                                        <Grid1><IoIosCreate  data-action={CAMPAIGN_ACTIONS.EDIT}/></Grid1>
                                                        <Grid1><IoIosTrash data-action={CAMPAIGN_ACTIONS.DELETE}/></Grid1>
                                                    </Card> 
                                                }
                                            </li>
                                        )
                                })
                            }
                            </ul>
                        </Grid8>
                        <Grid4>
                        {
                            this.state.selectedCampaign && <div style={{border:"10px solid #D4F4DD",borderRadius:"10px", padding:"20px",minHeight:"100%",marginLeft:"-8px", background:"white", zIndex:"50",marginTop:"4px"}}>
                                <H2>{this.state.selectedCampaign.name}</H2>
                                <ul>
                                {
                                    this.state.selectedCampaign && 
                                    this.state.selectedCampaign.actionHistory &&
                                    this.state.selectedCampaign.actionHistory.length>0 && 
                                    this.state.selectedCampaign.actionHistory.map((action) => {
                                        return(
                                            <li>{action.title}</li>
                                        )
                                    })
                                }
                                </ul>
                            </div>
                        }    
                        </Grid4>
                    </Row>
                </Container>
            </div>
            
        )
    }

}
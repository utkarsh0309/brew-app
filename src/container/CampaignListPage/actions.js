
import { CAMPAIGN_STATE } from '../../constants/CampaignStates';
import Action from '../../models/Action';

export const addActionHistory = (campaign, title, userName='self', detail='') => {
    let action = new Action(title, userName, detail);
    campaign.actionHistory.push(action);
}

export const changeCampaignState = (temp, index) => {
    
    
    if(temp[index].state!==CAMPAIGN_STATE.RUNNING){
        temp[index].state = CAMPAIGN_STATE.RUNNING;
        addActionHistory(temp[index], 'RESUMED')
    }
    else{
        temp[index].state = CAMPAIGN_STATE.PAUSED;
        addActionHistory(temp[index], 'PAUSED')
    }
    
    return temp
}

export const removeCampaign = (temp, index) => {
    delete temp[index]
    return temp
}


export const addComment = (campaign, userName, comment) => {
    let newComment = new Comment(userName, comment)
    addActionHistory(campaign, 'COMMENT', userName, comment)
    campaign.comments.push(comment)
    return campaign;
}
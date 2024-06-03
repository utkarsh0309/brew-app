export default class Action {

    constructor(title, userName = 'Self', detail = '') {
        this.title = title;
        this.userName = userName;
        this.detail = detail;
    }

}
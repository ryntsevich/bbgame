import Component from '../../component.js';

// import Error404 from '../../../views/pages/error404.js';

import Users from '../../../models/users.js';
import Meetings from '../../../models/meetings.js';

class UserMeetings extends Component {
    constructor() {
        super();

        this.modelMeeting = new Meetings();
    }

    getData() {
        return new Promise(resolve => this.modelMeeting.getMeetingsList().then(meetings => {
            this.meetings = meetings;
            this.activeM = this.meetings.filter(meeting => meeting.status === "Actual");
            resolve(meetings);
        }));
    }
    render(meetings) {
        return new Promise(resolve => {
            resolve(`
                <h1 class="page-title">Мои встречи</h1>
                <div class="meet-list-buttons">
                <button class="meet-list-actual" data-status = "Actual" >Предстоящие</button>
                <button class="meet-list-closed" data-status = "Closed" >Прошедшие</button>
                </div>
                    <div class="meet-list">
                    ${this.activeM.map(meeting => this.getMeetingHTML(meeting)).join('\n ')}
                    </div>
            `);
        });
    }
    afterRender() {
        this.setActions();
    }

    setActions() {
        const meetListContainer = document.getElementsByClassName('meet-list-buttons')[0],
            meetList = document.getElementsByClassName('meet-list')[0];

        meetListContainer.addEventListener('click', event => {
            const target = event.target,
                targetClassList = target.classList;

            switch (true) {
                case targetClassList.contains('meet-list-actual'):
                    this.renderUserMeetings(target.dataset.status, meetList);
                    break;

                case targetClassList.contains('meet-list-closed'):
                    this.renderUserMeetings(target.dataset.status, meetList);
                    break;
            };
        });
    }


    renderUserMeetings(status, meetList) {
        const filterMeeting = this.meetings.filter(meeting => meeting.status === status);
        meetList.innerHTML = `
        ${filterMeeting.map(meeting => this.getMeetingHTML(meeting)).join('\n ')}               
        `;
    }

    getMeetingHTML(meeting) {
        return `
            <div class="meeting">
                <a class="meeting__title" data-id="${meeting._id}" href="#/meetings/${meeting._id}">${meeting._id}</a>
            </div>
        `;
    }



}

export default UserMeetings;
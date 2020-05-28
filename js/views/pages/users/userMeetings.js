import Component from '../../component.js';
import Users from '../../../models/users.js';
import Meetings from '../../../models/meetings.js';

class UserMeetings extends Component {
    constructor() {
        super();

        this.modelMeeting = new Meetings();
        this.user = JSON.parse(localStorage.getItem('user'));

    }

    getData() {
        return new Promise(resolve => this.modelMeeting.getMeetingsList().then(meetings => {
            this.meetings = meetings;
            this.userMeetings = this.meetings.filter(meeting => meeting.players.includes(this.user._id));
            this.activeM = this.userMeetings.filter(meeting => meeting.status === "Actual");

            resolve(meetings);

        }));
    }

    render(meetings) {

        return new Promise(resolve => {
            resolve(`
                <h1 class="page-title">Мои встречи</h1>
                <div class="meet-list-buttons">
                    <button class="meet-list-actual active" data-status = "Actual">Предстоящие</button>
                    <button class="meet-list-closed" data-status = "Closed">Прошедшие</button>
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
                    this.setActiveTabs(meetListContainer, targetClassList);
                    this.renderUserMeetings(target.dataset.status, meetList);
                    break;

                case targetClassList.contains('meet-list-closed'):
                    this.setActiveTabs(meetListContainer, targetClassList);
                    this.renderUserMeetings(target.dataset.status, meetList);
                    break;
            };
        });

        meetList.addEventListener('click', event => {
            const target = event.target,
                targetClassList = target.classList;

            switch (true) {
                case targetClassList.contains('meeting'):
                case targetClassList.contains('meeting__title'):
                case targetClassList.contains('meeting__propertis'):
                case targetClassList.contains('meeting__propertis-a'):
                    this.redirectToMeetingInfo(target.dataset.id);
                    break;
            }
        });
    }

    setActiveTabs(meetListContainer, targetClassList) {
        meetListContainer.getElementsByClassName('active')[0].classList.remove('active');
        targetClassList.add('active');
    }

    renderUserMeetings(status, meetList) {
        const filterMeeting = this.userMeetings.filter(meeting => meeting.status === status);

        meetList.innerHTML = `
            ${filterMeeting.map(meeting => this.getMeetingHTML(meeting)).join('\n ')}
        `;
    }

    redirectToMeetingInfo(id) {
        location.hash = `#/meetings/${id}`;
    }


    getMeetingHTML(meeting) {
        return `
            <div class="meeting" data-id="${meeting._id}">
                <div class="meeting__title" data-id="${meeting._id}" href="#/meetings/${meeting._id}">${meeting.gameName}</div>
                <div class="meeting__propertis" data-id="${meeting._id}">
                    <div class="meeting__propertis-a" data-id="${meeting._id}" >${meeting.day}</div>
                    <div class="meeting__propertis-a" data-id="${meeting._id}" >${meeting.place}</div>
                </div>
            </div>
        `;
    }
}

export default UserMeetings;
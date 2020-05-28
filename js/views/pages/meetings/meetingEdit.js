import Component from '../../component.js';
import Meetings from '../../../models/meetings.js';
import Error404 from '../../../views/pages/error404.js';
import Users from '../../../models/users.js';


class MeetingEdit extends Component {
    constructor() {
        super();

        this.modelMeeting = new Meetings();
        this.modelUser = new Users();
    }
    getData() {
        return new Promise(resolve => this.modelMeeting.getMeeting(this.request.id).then(meeting => {
            this.meeting = meeting;
            this.modelUser.getUsersByIds(this.meeting.players).then(users => {
                this.users = users;
                // console.log(this.users)
                resolve(meeting);
            });
        }
        ));
    }

    render(meeting) {
        return new Promise(resolve => {
            let html;

            if (meeting) {
                const { _id, gameName, day, time, place, description, players } = meeting;

                html = `
                <h1 class="page-title">Встреча</h1>
                <div class="meet">
                <div class="meet-propertis">
                    <div class="meet-propertis__title">Игра:</div>
                    <div class="meet-propertis__content">${gameName}</div>
                </div>
                <div class="meet-propertis">
                    <div class="meet-propertis__title">Дата:</div>
                    <input class="meet-propertis__content meet-edit-day" type="date" value="${day}">
                </div>
                <div class="meet-propertis">
                    <div class="meet-propertis__title">Время:</div>
                    <input class="meet-propertis__content meet-edit-time" type="time" value="${time}">
                </div>
                <div class="meet-propertis">
                    <div class="meet-propertis__title">Место:</div>
                    <input class="meet-propertis__content meet-edit-place" type="text" value="${place}">
                </div>
                <div class="meet-propertis">
                    <div class="meet-propertis__title">Участники:</div>
                    ${this.users.map(user => `<div class="meet-propertis__content ">${user.name}</div>`).join('\n ')}
                </div>
                <div class="meet-propertis">
                    <div class="meet-propertis__title">Описание:</div>
                    <textarea class="meet-propertis__content meet-edit-description" type="text" value="${description}">${description}</textarea>
                </div>
                <div class="meet-propertis-btn">
                    <button class="btn-save-meet">Сохранить правки</button>
                    <a class="btn-cancel-meet" href ="#/meetings/${this.meeting._id}">Отмена</a>
                </div>
            </div>
                </div>
`;
            } else {
                html = new Error404().render();
            }
            resolve(html);
        });
    }

    afterRender() {
        this.setActions();

    }

    setActions() {
        const btnSaveMeeting = document.getElementsByClassName('btn-save-meet')[0],
            editDay = document.getElementsByClassName('meet-edit-day')[0],
            editTime = document.getElementsByClassName('meet-edit-time')[0],
            editPlace = document.getElementsByClassName('meet-edit-place')[0],
            editDescription = document.getElementsByClassName('meet-edit-description')[0];

        btnSaveMeeting.addEventListener('click', () => this.editMeeting(editDay, editTime, editPlace, editDescription, btnSaveMeeting));
    }

    editMeeting(editDay, editTime, editPlace, editDescription, btnSaveMeeting) {
        this.meeting.day = editDay.value.trim();
        this.meeting.time = editTime.value.trim();
        this.meeting.place = editPlace.value.trim();
        this.meeting.description = editDescription.value.trim();


        this.modelMeeting.editMeeting(this.meeting).then(meeting => this.redirectToMeetingInfo(this.meeting._id));
    }

    redirectToMeetingInfo() {
        location.hash = `#/meetings/${this.meeting._id}`;
    }

}

export default MeetingEdit;


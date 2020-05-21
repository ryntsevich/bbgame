import Component from '../../component.js';
import Meetings from '../../../models/meetings.js';
import Error404 from '../../../views/pages/error404.js';


class MeetingInfo extends Component {
    constructor() {
        super();

        this.modelMeeting = new Meetings();
    }
    getData() {
        return new Promise(resolve => this.modelMeeting.getMeeting(this.request.id).then(meeting => {
            this.meeting = meeting;
            resolve(meeting);
        }
        ));
    }

    render(meeting) {
        return new Promise(resolve => {
            let html;

            if (meeting) {
                const { id, gameName, day, time, place, description, players } = meeting;

                html = `
                <h1 class="page-title">Встреча ${id}</h1>
                <div class="meet">
                    <div class="meet-propertis">
                        <div class="meet-propertis__title">Игра:</div>
                        <div class="meet-propertis__content">${gameName}</div>
                    </div>
                    <div class="meet-propertis">
                        <div class="meet-propertis__title">Дата:</div>
                        <div class="meet-propertis__content">${day}</div>
                    </div>
                    <div class="meet-propertis">
                        <div class="meet-propertis__title">Время:</div>
                        <div class="meet-propertis__content">${time}</div>
                    </div>
                    <div class="meet-propertis">
                        <div class="meet-propertis__title">Место:</div>
                        <div class="meet-propertis__content">${place}</div>
                    </div>
                    <div class="meet-propertis">
                        <div class="meet-propertis__title">Участники:</div>
                        <div class="meet-propertis__content">${players}</div>
                    </div>
                    <div class="meet-propertis">
                        <div class="meet-propertis__title">Описание:</div>
                        <div class="meet-propertis__content">${description}</div>
                    </div>
                    <div class="meet-propertis-btn">
                        <button class="btn-close-meet">Закрыть встречу</button>
                        <button class="btn-edit-meet">Редактировать встречу</button>
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
        const btnCloseMeeting = document.getElementsByClassName('btn-close-meet')[0],
            btnEditMeeting = document.getElementsByClassName('btn-edit-meet')[0];


        btnCloseMeeting.addEventListener('click', () => this.deleteMeeting(this.meeting.id));
        btnEditMeeting.addEventListener('click', () => this.redirectToMeetingEdit(this.meeting.id));
    }

    deleteMeeting(id) {
        this.modelMeeting.closeMeeting(id).then(meeting => this.redirectToMeetingsList());

    }

    redirectToMeetingsList() {
        location.hash = `#/meetings`;
    }
    redirectToMeetingEdit() {
        location.hash = `#/meeting/${this.meeting.id}/edit`;
    }

}

export default MeetingInfo;


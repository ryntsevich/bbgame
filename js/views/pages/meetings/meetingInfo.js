import Component from '../../component.js';
import Meetings from '../../../models/meetings.js';
import Error404 from '../../../views/pages/error404.js';
import Users from '../../../models/users.js';


class MeetingInfo extends Component {
    constructor() {
        super();

        this.modelMeeting = new Meetings();
        this.modelUser = new Users();
        this.maxPlayersLS = localStorage.getItem('maxPlayers');
        this.user = JSON.parse(localStorage.getItem('user'));


    }
    getData() {
        return new Promise(resolve => this.modelMeeting.getMeeting(this.request.id).then(meeting => {
            this.meeting = meeting;
            this.modelUser.getUsersByIds(meeting.players).then(users => {
                this.users = users;
                resolve(meeting);
            });
        }
        ));
    }

    render(meeting) {
        return new Promise(resolve => {
            let html;

            if (meeting) {
                const { _id, gameName, day, time, place, description, players, status } = meeting;

                let isTrue = players.includes(this.user._id) || status === 'Closed' || players.length == this.maxPlayersLS;

                html = `
                <h1 class="page-title">Встреча</h1>
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
                    <div class="meet-propertis players">
                        <div class="meet-propertis__title">Участники:</div>
                        ${this.users.map(user => `<a class="meet-propertis__content" href="#/users/${user._id}">${user.username}</a></br>`).join('\n ')} 
                        </div>
                    <div class="meet-propertis">
                        <div class="meet-propertis__title">Описание:</div>
                        <div class="meet-propertis__content">${description}</div>
                    </div>
                    <div class="meet-propertis-btn">
                    <button class="btn-close-meet main">Закрыть встречу</button>
                    <button class="btn-edit-meet main">Редактировать встречу</button>
                    <button class="btn-repeal-meet main">Отменить встречу</button>
                    <button class="btn-join-meet" ${ isTrue && 'disabled'}>Принять участие</button>
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
        const btnEditMeeting = document.getElementsByClassName('btn-edit-meet')[0],
            // btnDeleteMeeting = document.getElementsByClassName('btn-delete-meet')[0],
            btnCloseMeeting = document.getElementsByClassName('btn-close-meet')[0],
            btnJoinMeeting = document.getElementsByClassName('btn-join-meet')[0],
            playersContainer = document.getElementsByClassName('players')[0];

        // user = JSON.parse(localStorage.getItem('user'));



        // btnDeleteMeeting.addEventListener('click', () => this.deleteMeeting(this.meeting._id));
        btnEditMeeting.addEventListener('click', () => this.redirectToMeetingEdit(this.meeting._id));
        btnCloseMeeting.addEventListener('click', () => this.closeMeeting(this.meeting._id));
        btnJoinMeeting.addEventListener('click', () => this.joinToMeeting(this.meeting._id, this.user._id, playersContainer, btnJoinMeeting));
    }

    // deleteMeeting(id) {
    //     this.modelMeeting.deleteMeeting(id).then(meeting => this.redirectToMeetingsList());
    // }

    closeMeeting(id) {
        this.modelMeeting.closeMeeting(id).then(meeting => this.redirectToMeetingsList());
    }

    joinToMeeting(meetingId, userId, playersContainer, btnJoinMeeting) {
        this.modelMeeting.joinToMeeting(meetingId, userId).then(result => {
            this.meeting.players.push(userId);
            this.modelUser.getUsersByIds(this.meeting.players).then(users => {
                this.users = users;
                btnJoinMeeting.disabled = this.users.length >= this.maxPlayersLS;
                playersContainer.innerHTML = `
                       <div class="meet-propertis__title">Участники:</div>
                        ${this.users.map(user => `<a class="meet-propertis__content" href="#/users/${user._id}">${user.name}</a></br>`).join('\n ')}
                     `;
            }
            )
        });
    }

    redirectToMeetingsList() {
        location.hash = `#/meetings`;
    }
    redirectToMeetingEdit() {
        location.hash = `#/meetings/${this.meeting._id}/edit`;
    }

}

export default MeetingInfo;


import Component from '../../component.js';
// import Meetings from '../../../models/meetings.js';
import Error404 from '../../../views/pages/error404.js';
import Meetings from '../../../models/meetings.js';


class MeetingAdd extends Component {
    constructor() {
        super();

        this.modelMeetings = new Meetings();
    }

    render() {
        return new Promise(resolve => {
            resolve(`
            <h1 class="page-title">Создание встречи</h1>
            <div class="meet">
                <div class="meet-propertis">
                    <div class="meet-propertis__title">Игра:</div>
                    <input class="meet-propertis__content meet-add-gameName">
                </div>
                <div class="meet-propertis">
                    <div class="meet-propertis__title">Дата:</div>
                    <input class="meet-propertis__content meet-add-day">
                </div>
                <div class="meet-propertis">
                    <div class="meet-propertis__title">Время:</div>
                    <input class="meet-propertis__content meet-add-time">
                </div>
                <div class="meet-propertis">
                    <div class="meet-propertis__title">Место:</div>
                    <input class="meet-propertis__content meet-add-place">
                </div>
                <div class="meet-propertis">
                    <div class="meet-propertis__title">Описание:</div>
                    <input class="meet-propertis__content meet-add-description">
                </div>
                <div class="meet-propertis-btn">
                    <button class="btn-create-meet">Создать встречу</button>
                </div>
            </div>
            `);
        });
    }

    afterRender() {
        this.setActions();

    }

    setActions() {
        const btnCreateMeeting = document.getElementsByClassName('btn-create-meet')[0],
            addGameName = document.getElementsByClassName('meet-add-gameName')[0],
            addDay = document.getElementsByClassName('meet-add-day')[0],
            addTime = document.getElementsByClassName('meet-add-time')[0],
            addPlace = document.getElementsByClassName('meet-add-place')[0],
            addDescription = document.getElementsByClassName('meet-add-place')[0];


        btnCreateMeeting.addEventListener('click', () => this.addNewMeeting(addGameName, addDay, addTime, addPlace, addDescription));

    }
    addNewMeeting(addGameName, addDay, addTime, addPlace, addDescription) {
        const newMeeting = {
            gameName: addGameName.value.trim(),
            day: addDay.value.trim(),
            time: addTime.value.trim(),
            place: addPlace.value.trim(),
            description: addDescription.value.trim()
        };

        this.modelMeetings.addMeeting(newMeeting).then(meeting => {
            this.clearAddNewMeeting(addGameName, addDay, addTime, addPlace, addDescription);
        })

    }

    clearAddNewMeeting(addGameName, addDay, addTime, addPlace, addDescription) {
        addGameName.value = '';
        addDay.value = '';
        addTime.value = '';
        addPlace.value = '';
        addDescription.value = '';
    }



}

export default MeetingAdd;


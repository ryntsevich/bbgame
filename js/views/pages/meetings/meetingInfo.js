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
                const { id, gameName, description, players} = meeting;

                html = `
                <h1 class="page-title">Создание встречи</h1>
                <div class="meet">
                    <div class="meet-propertis">
                        <div class="meet-propertis__title">Игра:</div>
                        <div class="meet-propertis__content">${gameName}</div>
                    </div>
                    <div class="meet-propertis">
                        <div class="meet-propertis__title">Дата:</div>
                        <div class="meet-propertis__content">${players}</div>
                    </div>
                    <div class="meet-propertis">
                        <div class="meet-propertis__title">Время:</div>
                        <div class="meet-propertis__content">${players}</div>
                    </div>
                    <div class="meet-propertis">
                        <div class="meet-propertis__title">Место:</div>
                        <div class="meet-propertis__content">${players}</div>
                    </div>
                    <div class="meet-propertis">
                        <div class="meet-propertis__title">Участники:</div>
                        <div class="meet-propertis__content">${players}</div>
                    </div>
                    <div class="meet-propertis">
                        <div class="meet-propertis__title">Описание:</div>
                        <div class="meet-propertis__content">${description}</div>
                    </div>
                </div>
`;
            } else {
                html = new Error404().render();
            }
            resolve(html);
        });
    }


}

export default MeetingInfo;


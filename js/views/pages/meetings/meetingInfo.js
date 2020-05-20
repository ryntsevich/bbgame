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
                // const { id, title, img, age, numberPlayers, time } = game;

                html = `
                <h1 class="page-title">Встреча</h1>
                <div class="meet">
                    <p>
                        <b>Игра:</b>
                        Серп
                    </p>
                    <p>
                        <b>Участники:</b>
                        Серп
                    </p>
                    <p>
                        <b>Описание:</b>
                        Серп
                    </p>
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


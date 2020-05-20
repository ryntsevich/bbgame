import Component from '../../component.js';

// import Error404 from '../../../views/pages/error404.js';
import Meetings from '../../../models/meetings.js';

class MeetingsList extends Component {
    constructor() {
		super();
		
        this.modelMeeting = new Meetings();
	}
	
	getData() {
		return new Promise(resolve => this.modelMeeting.getMeetingsList().then(meetings => resolve(meetings)));
	}
    render(meetings) {
        return new Promise(resolve => {
            resolve(`
                <h1 class="page-title">Список всех встреч</h1>
                    <div class="meet-list">
                    ${meetings.map(meeting => this.getMeetingHTML(meeting)).join('\n ')}
                    </div>
            `);
        });
    }

    getMeetingHTML(meeting) {
        return `
            <div class="meeting">
                <a class="meeting__title" data-id="${meeting.id}" href="#/meetings/${meeting.id}">${meeting.id}</a>
            </div>
        `;
    }


}

export default MeetingsList;
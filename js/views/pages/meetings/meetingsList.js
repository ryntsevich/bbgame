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
            <div class="meeting" data-id="${meeting._id}">
                <a class="meeting__title" data-id="${meeting._id}" href="#/meetings/${meeting._id}">${meeting._id}</a>
            </div>
        `;
    }

    afterRender() {
        this.setActions();
    }

    setActions() {
        const meetingContainer = document.getElementsByClassName('meet-list')[0];

        meetingContainer.addEventListener('click', event => {
            const target = event.target,
                targetClassList = target.classList;

            switch (true) {
                case targetClassList.contains('meeting'):
                case targetClassList.contains('meeting__title'):
                    this.redirectToMeetingInfo(target.dataset.id);
                    break;

            }
        });

    }

    redirectToMeetingInfo(id) {
        location.hash = `#/meetings/${id}`;
    }
}

export default MeetingsList;
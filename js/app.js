import { parseRequestURL } from './helpers/utils.js';

import Header from './views/partials/header.js';
import Footer from './views/partials/footer.js';

import Login from './views/pages/login.js';
import SignUp from './views/pages/join.js';

import Error404 from './views/pages/error404.js';

import GameInfo from './views/pages/games/gameInfo.js';
import GamesList from './views/pages/games/gamesList.js';

import UserInfo from './views/pages/users/userInfo.js';
import UsersList from './views/pages/users/usersList.js';
import UserMeetings from './views/pages/users/userMeetings.js';

import MeetingInfo from './views/pages/meetings/meetingInfo.js';
import MeetingsList from './views/pages/meetings/meetingsList.js';
import MeetingAdd from './views/pages/meetings/meetingAdd.js';
import MeetingEdit from './views/pages/meetings/meetingEdit.js';

const Routes = {
    '/': Login,
    '/join': SignUp,
    '/games': GamesList,
    '/games/:id': GameInfo,
    '/users': UsersList,
    '/users/:id': UserInfo,
    '/users/:id/meetings': UserMeetings,
    '/meetings/:id': MeetingInfo,
    '/meetings': MeetingsList,
    '/create': MeetingAdd,
    '/meetings/:id/edit': MeetingEdit
};

function router() {
    const
        contentContainer = document.getElementsByClassName('content-container')[0],
        footerContainer = document.getElementsByClassName('footer-container')[0],
        pageContainer = document.getElementsByClassName('page-container')[0],
        footer = new Footer();

    let headerContainer = document.getElementsByClassName('header-container')[0];


    const request = parseRequestURL(),
        parsedURL = `/${request.resource || ''}${request.id ? '/:id' : ''}${request.action ? `/${request.action}` : ''}`,
        page = Routes[parsedURL] ? new Routes[parsedURL]() : new Error404();

    if (parsedURL != '/' && parsedURL != '/join') {
        if (!headerContainer) {
            pageContainer.insertAdjacentHTML('afterbegin', '<div class="header-container"></div>');
            headerContainer = document.getElementsByClassName('header-container')[0];
        }
        const header = new Header();
        header.render().then(html => headerContainer.innerHTML = html)
    } else if (headerContainer && (parsedURL == '/' || parsedURL == '/join')) {
        headerContainer.remove();
    }

    page.getData().then(data => {
        page.render(data).then(html => {
            contentContainer.innerHTML = html;
            page.afterRender();
        });
    });

    footer.render().then(html => footerContainer.innerHTML = html);
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
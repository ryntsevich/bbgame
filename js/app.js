import { parseRequestURL } from './helpers/utils.js';

import Header from './views/partials/header.js';
import Footer from './views/partials/footer.js';

// import About from './views/pages/about.js';
import Login from './views/pages/login.js';
import SignUp from './views/pages/join.js';

import Error404 from './views/pages/error404.js';

// import AddAndList from './views/pages/tasks/add-list.js';
import GameInfo from './views/pages/games/gameInfo.js';
import GamesList from './views/pages/games/gamesList.js';
import UserInfo from './views/pages/users/userInfo.js';
import UsersList from './views/pages/users/usersList.js';
import MeetingInfo from './views/pages/meetings/meetingInfo.js';
import MeetingsList from './views/pages/meetings/meetingsList.js';

// import Edit from './views/pages/tasks/edit.js';


const Routes = {
    '/': Login,
    '/join': SignUp,
    '/games': GamesList,
    '/games/:id': GameInfo,
    '/users': UsersList,
    '/users/:id': UserInfo,
    '/meetings/:id': MeetingInfo,
    '/meetings': MeetingsList
    // '/tasks': AddAndList
    // '/game/:id/edit': GameEdit
};

function router() {
    const headerContainer = document.getElementsByClassName('header-container')[0],
        contentContainer = document.getElementsByClassName('content-container')[0],
        footerContainer = document.getElementsByClassName('footer-container')[0],
        header = new Header(),
        footer = new Footer();

    if (headerContainer) {
        header.render().then(html => headerContainer.innerHTML = html)
    }

    const request = parseRequestURL(),
        parsedURL = `/${request.resource || ''}${request.id ? '/:id' : ''}${request.action ? `/${request.action}` : ''}`,
        page = Routes[parsedURL] ? new Routes[parsedURL]() : new Error404();

    page.getData().then(data => {
        page.render(data).then(html => {
            contentContainer.innerHTML = html;
            page.afterRender();
        });
    });

    if (footerContainer) {
        footer.render().then(html => footerContainer.innerHTML = html);
    }
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
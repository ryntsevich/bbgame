import { parseRequestURL } from './helpers/utils.js';

import Header from './views/partials/header.js';
import Footer from './views/partials/footer.js';

// import About from './views/pages/about.js';
import Login from './views/pages/login.js';
import GamesList from './views/pages/games/gamesList.js';
import Error404 from './views/pages/error404.js';

// import AddAndList from './views/pages/tasks/add-list.js';
// import Info from './views/pages/tasks/info.js';
// import Edit from './views/pages/tasks/edit.js';


const Routes = {
    '/': Login,
    '/games': GamesList
    // '/tasks': AddAndList
    // '/game/:id': GameInfo,
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

    page.render().then(html => {
        contentContainer.innerHTML = html;
        page.afterRender();
    });
    if (footerContainer) {
        footer.render().then(html => footerContainer.innerHTML = html);
    }
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
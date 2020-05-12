import {parseRequestURL} from '../helpers/utils.js';

import Games from '../models/games.js';

class Component {
    constructor() {
        this.request = parseRequestURL();
        this.games = new Games().getGamesFromLS();
    }

    afterRender() {}
}

export default Component;
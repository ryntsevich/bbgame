import { parseRequestURL } from '../helpers/utils.js';

// import Games from '../models/games.js';

class Component {
    constructor() {
        this.request = parseRequestURL();

    }
    getData() {
        return new Promise(resolve => resolve());
    }


    afterRender() { }
}

export default Component;
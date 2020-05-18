import Component from '../../component.js';

// import Error404 from '../../../views/pages/error404.js';

import Games from '../../../models/games.js';

class GamesList extends Component {
    constructor() {
		super();
		
		this.model = new Games();
	}
	
	getData() {
		return new Promise(resolve => this.model.getGamesList().then(games => resolve(games)));
	}
    render(games) {
        return new Promise(resolve => {
            resolve(`
                <h1 class="page-title">Список всех игр</h1>
                <div class="games">
                    <div class="games-list">
                    ${games.map(game => this.getGameHTML(game)).join('\n ')}
                    </div>
                </div>
            `);
        });
    }

    getGameHTML(game) {
        return `
            <div class="game">
                <div class="game__img" data-id="${game.id}">
                    <img data-id="${game.id}" src="${game.img}" alt="">
                </div>
            <a class="game__title" data-id="${game.id}" href="#/games/${game.id}">${game.title}</a>
            </div>
        `;
    }


}

export default GamesList;
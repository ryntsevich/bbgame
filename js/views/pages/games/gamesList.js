import Component from '../../component.js';
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

    afterRender() {
        this.setActions();
    }

    setActions() {
        const gameContainer = document.getElementsByClassName('games-list')[0];

        gameContainer.addEventListener('click', event => {
            const target = event.target,
                targetClassList = target.classList;

            switch (true) {
                case targetClassList.contains('game'):
                case targetClassList.contains('game__img'):
                case targetClassList.contains('game__title'):
                    this.redirectToGameInfo(target.dataset.id);
                    break;
            }
        });
    }

    redirectToGameInfo(id) {
        location.hash = `#/games/${id}`;
    }

    getGameHTML(game) {
        return `
            <div class="game gameList" data-id="${game._id}">
                <div class="game__img" data-id="${game._id}">
                    <img class="game__img" data-id="${game._id}" src="${game.img}" alt="">
                </div>
            <div class="game__title" data-id="${game._id}">${game.title}</div>
            </div>
        `;
    }
}

export default GamesList;
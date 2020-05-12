import Component from '../../component.js';

// import Error404 from '../../../views/pages/error404.js';

// import Games from '../../../models/games.js';

class GamesList extends Component {
    render() {
        return new Promise(resolve => {
            resolve(`
                <h1 class="page-title">Список всех игр</h1>
                <div class="games">
                    <div class="games-list">
                    ${this.games.map(game => this.getGameHTML(game)).join('\n ')}
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
            <div class="game__title" data-id="${game.id}">${game.title}</div>
            </div>
        `;
    }


}

export default GamesList;
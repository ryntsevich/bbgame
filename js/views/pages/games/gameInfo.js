import Component from '../../component.js';
import Games from '../../../models/games.js';
import Error404 from '../../../views/pages/error404.js';


class GameInfo extends Component {
    constructor() {
        super();

        this.model = new Games();
    }
    getData() {
        return new Promise(resolve => this.model.getGame(this.request.id).then(game => resolve(game)));
    }

    render(game) {
        return new Promise(resolve => {
            let html;

            if (game) {
                const { id, title, img, age, numberPlayers, time, description } = game;

                html = `
                <h1 class="page-title">${title}</h1>
                <div class="game-info">
                    <div class="game-info__properties" data-id="${id}">
                        <div class="properties__img" data-id="${id}">
                            <img data-id="${id}" src="${img}" alt="">
                        </div>
                        <div class="properties">
                            <div class="properties__title ">Характеристики</div>
                            <div class="properties__name">
                                <div class="name">Количество игроков</div>
                                <div class="value">${numberPlayers}</div>
                            </div>
                            <div class="properties__name">
                                <div class="name">Возраст игроков</div>
                                <div class="value">${age}</div>
                            </div>
                            <div class="properties__name">
                                <div class="name">Время игры</div>
                                <div class="value">${time}</div>
                            </div>
                        </div>
                    </div>
                    <div class="game-info__description" data-id="id">
                        <div class="description-title">Описание</div>
                        <div class="description-content">
                            ${game.description.map(paragraph => this.getParagraphHTML(paragraph)).join('\n ')}
                        </div>
                    </div>
                </div>
`;
            } else {
                html = new Error404().render();
            }
            resolve(html);
        });
    }
    getParagraphHTML(paragraph) {
        return `<p>${paragraph}</p>`;
    }
}

export default GameInfo;


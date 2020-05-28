import Component from '../../component.js';
import Users from '../../../models/users.js';
import Games from '../../../models/games.js';
import Error404 from '../../../views/pages/error404.js';


class GameInfo extends Component {
    constructor() {
        super();

        this.modelUsers = new Users();
        this.modelGames = new Games();
        this.user = JSON.parse(localStorage.getItem('user'));
    }
    getData() {
        return new Promise(resolve => this.modelGames.getGame(this.request.id).then(game => {
            this.game = game;
            resolve(game);
        }
        ));
    }

    render(game) {
        return new Promise(resolve => {
            let html;

            if (game) {
                const { _id, title, img, age, minPlayers, maxPlayers, time } = game,
                    user = JSON.parse(localStorage.getItem('user'));


                html = `
                <h1 class="page-title">${title}</h1>
                <div class="game-info">
                    <div class="game-info__properties" data-id="${_id}">
                        <div class="properties__img" data-id="${_id}">
                            <img data-id="${_id}" src="${img}" alt="">
                        </div>
                        <div class="properties">
                            <div class="properties__title ">Характеристики</div>
                            <div class="properties__name">
                                <div class="name">Количество игроков</div>
                                <div class="value">${minPlayers} - ${maxPlayers}</div>
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
                    <div class="game-info__buttons">
                    ${user.collectionGames.includes(_id) ? `<button class="game-info-buttons__btn-usersGames" data-status="delete" data-collection="collectionGames">Удалить из коллекции</button>`
                        : `<button class="game-info-buttons__btn-usersGames" data-status="add" data-collection="collectionGames">В мою коллекцию</button>`}
                        ${user.wishGames.includes(_id) ? `<button class="game-info-buttons__btn-wishGames" data-status="delete" data-collection="wishGames">Удалить из "Хочу поиграть"</button>`
                        : `<button class="game-info-buttons__btn-wishGames" data-status="add" data-collection="wishGames">Хочу поиграть</button>`}
                        ${user.playedGames.includes(_id) ? `<button class="game-info-buttons__btn-playedGames" data-status="delete" data-collection="playedGames">Удалить из "Играл"</button>`
                        : `<button class="game-info-buttons__btn-playedGames" data-status="add" data-collection="playedGames">Играл</button>`}
                        <button class="user-info-buttons__btn-createMeeting">Создать встречу</button>
                    </div>
                    <div class="game-info__description" data-id="_id">
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

    afterRender() {
        this.setActions();
        this.getParagraphHTML();
    }

    setActions() {
        const buttonsGameInfoContainer = document.getElementsByClassName('game-info__buttons')[0],
            btnToUsersGame = document.getElementsByClassName('game-info-buttons__btn-usersGames')[0],
            btnToWishGames = document.getElementsByClassName('game-info-buttons__btn-wishGames')[0],
            btnToPlayedGames = document.getElementsByClassName('game-info-buttons__btn-playedGames')[0],
            btnCreateMeeting = document.getElementsByClassName('user-info-buttons__btn-createMeeting')[0],
            user = JSON.parse(localStorage.getItem('user'));

        buttonsGameInfoContainer.addEventListener('click', () => {
            const target = event.target,
                targetClassList = target.classList;

            switch (true) {
                case targetClassList.contains('game-info-buttons__btn-usersGames'):
                    this.selectActionButton(target.dataset.status, user._id, this.game._id, target.dataset.collection, btnToUsersGame);
                    break;
                case targetClassList.contains('game-info-buttons__btn-wishGames'):
                    this.selectActionButton(target.dataset.status, user._id, this.game._id, target.dataset.collection, btnToWishGames);
                    break;
                case targetClassList.contains('game-info-buttons__btn-playedGames'):
                    this.selectActionButton(target.dataset.status, user._id, this.game._id, target.dataset.collection, btnToPlayedGames);
                    break;
            }
        });

        btnCreateMeeting.addEventListener('click', () => {
            localStorage.setItem('nameGame', this.game.title);
            localStorage.setItem('maxPlayers', this.game.maxPlayers);
            this.redirectToMeetingAdd();
        });
    }

    selectActionButton(status, userId, gameId, collection, btnToPlayedGames) {
        status === 'add' ? this.addGameToUserCollection(userId, gameId, collection, btnToPlayedGames) : this.deleteGameFromUserCollection(userId, gameId, collection, btnToPlayedGames);
    }

    addGameToUserCollection(userId, gameID, typeCollection, buttonName) {
        this.modelUsers.addToCollection(userId, gameID, typeCollection).then(user => {
            this.modelUsers.getUser(userId).then(user => {
                localStorage.setItem('user', JSON.stringify(user));
                buttonName.dataset.status = 'delete';
                if (typeCollection === "playedGames") {
                    buttonName.textContent = 'Удалить из "Играл"';
                } else if (typeCollection === "wishGames") {
                    buttonName.textContent = 'Удалить из "Хочу поиграть"';
                } else {
                    buttonName.textContent = 'Удалить из коллекции';
                }
            });
        });
    }

    deleteGameFromUserCollection(userId, gameID, typeCollection, buttonName) {
        console.log(buttonName)
        this.modelUsers.deleteFromCollection(userId, gameID, typeCollection).then(user => {
            this.modelUsers.getUser(userId).then(user => {
                localStorage.setItem('user', JSON.stringify(user));
                buttonName.dataset.status = 'add';
                if (typeCollection === "playedGames") {
                    buttonName.textContent = 'Играл';
                } else if (typeCollection === "wishGames") {
                    buttonName.textContent = 'Хочу поиграть';
                } else {
                    buttonName.textContent = 'В мою коллекцию';
                }
            });
        });
    }

    getParagraphHTML(paragraph) {
        return `<p>${paragraph}</p>`;
    }

    redirectToMeetingAdd() {
        location.hash = `#/create`;
    }
}

export default GameInfo;


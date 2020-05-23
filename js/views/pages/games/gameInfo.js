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
            // this.modelUsers.getUser(this.user.id).then()
            this.game = game;
            resolve(game);
        }
        ));
    }



    render(game) {
        return new Promise(resolve => {
            let html;

            if (game) {
                const { id, title, img, age, minPlayers, maxPlayers, time } = game;
                const user = JSON.parse(localStorage.getItem('user'));
                // console.log(user.collectionGames.includes(id));


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
                    ${user.collectionGames.includes(id) ? `<button class="game-info-buttons__btn-usersGames" data-status="delete" data-collection="usersGames">Удалить из коллекции</button>`
                        : `<button class="game-info-buttons__btn-usersGames" data-status="add" data-collection="usersGames">В мою коллекцию</button>`}
                        <button class="game-info-buttons__btn-wishGames" data-collection="wishGames">Хочу поиграть</button>
                        <button class="game-info-buttons__btn-playedGames" data-collection="playedGames">Играл</button>
                        <button class="user-info-buttons__btn-createMeeting">Создать встречу</button>
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

            btnDeleteFromUserGame = document.getElementsByClassName('game-info-buttons__btn-usersGames-delete')[0];

        const user = JSON.parse(localStorage.getItem('user'));

        buttonsGameInfoContainer.addEventListener('click', () => {
            const target = event.target,
                targetClassList = target.classList;

            switch (true) {
                case targetClassList.contains('game-info-buttons__btn-usersGames'):
                    if (target.dataset.status === 'add') {
                        this.addGameToUserCollection(user.id, this.game.id, target.dataset.collection, btnToUsersGame);
                        break;
                    } else {
                        this.deleteGameFromUserCollection(user.id, this.game.id, target.dataset.collection, btnToUsersGame);
                        break;
                    }

                case targetClassList.contains('game-info-buttons__btn-wishGames'):
                    this.addGameToUserCollection(user.id, this.game.id, target.dataset.collection, btnToWishGames);
                    break;

                case targetClassList.contains('game-info-buttons__btn-playedGames'):
                    this.addGameToUserCollection(user.id, this.game.id, target.dataset.collection, btnToPlayedGames);
                    break;

                case targetClassList.contains('game-info-buttons__btn-usersGames-delete'):
                    this.deleteGameFromUserCollection(user.id, this.game.id, target.dataset.collection, btnDeleteFromUserGame);
                    break;
            }

        });

        btnCreateMeeting.addEventListener('click', () => {
            localStorage.setItem('nameGame', this.game.title);
            localStorage.setItem('maxPlayers', this.game.maxPlayers);
            this.redirectToMeetingAdd();
        });
    }



    addGameToUserCollection(userId, gameID, typeCollection, buttonName) {
        this.modelUsers.addToCollection(userId, gameID, typeCollection).then(button => {
            buttonName.dataset.status = 'delete'
            buttonName.textContent = 'Удалить из коллекции';
        })
    }

    deleteGameFromUserCollection(userId, gameID, typeCollection, buttonName) {
        this.modelUsers.deleteFromCollection(userId, gameID, typeCollection).then(button => {
            buttonName.dataset.status = 'add'
            buttonName.textContent = 'В мою коллекцию';
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


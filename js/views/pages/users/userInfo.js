import Component from '../../component.js';
import Users from '../../../models/users.js';
import Error404 from '../../../views/pages/error404.js';
import Games from '../../../models/games.js';
import Meetings from '../../../models/meetings.js';


class UserInfo extends Component {
    constructor() {
        super();

        this.model = new Users();
        this.modelGames = new Games();
    }

    getData() {
        return new Promise(resolve => this.model.getUser(this.request.id).then(user => {
            this.modelGames.getGamesByIds(user.collectionGames).then(games => {
                user['renderGames'] = games;
                this.user = user;
                localStorage.setItem('user', JSON.stringify(this.user));
                resolve(user);
            });
        }));
    }


    render(user) {

        return new Promise(resolve => {
            let html;

            if (user) {

                html = `
                <h1 class="page-title">${user.username}</h1>
                <div class="user-info">
                    <div class="user-info__img">
                        <img src="${user.img}" alt="img">
                    </div>
                    <div class="user-info__about">
                        <div class="user-name item">
                            <div class="name">Имя</div>
                            <div class="value" type ="text">${user.name}</div>
                        </div>
                        <div class="user-city item">
                            <div class="name">Город</div>
                            <div class="value">${user.city}</div>
                        </div>
                        <div class="user-age item">
                            <div class="name">Возраст</div>
                            <div class="value">${user.age}</div>
                        </div>
                        <div class="user-gender item">
                            <div class="name">Пол</div>
                            <div class="value">${user.gender}</div>
                        </div>
                    </div>
                    <div class = "user-info__buttons">
                        <a class="user-info-buttons__btn-editUserPage" href="#/users/${user._id}/edit">Редактировать</a>
                        <a class="user-info-buttons__btn-usersMeetings" href="#/users/${user._id}/meetings">Мои встречи</a>
                    </div>
                </div>
                <div class="user-info-games">
                    <div class="user-info-games-buttons">
                        <button class="user-info-games-buttons__btn-usersGames btn-tab active">Моя коллекция</button>
                        <button class="user-info-games-buttons__btn-wishGames btn-tab">Хочу поиграть</button>
                        <button class="user-info-games-buttons__btn-playedGames btn-tab">Играл</button>
                    </div>
                    <div class="games">
                        <div class="games-list">
                            ${user.renderGames.length != 0 ? user.renderGames.map(game => this.getUsersGames(game)).join('\n ') : 'Список пуст'}
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
    }

    setActions() {
        const buttonsContainer = document.getElementsByClassName('user-info-games-buttons')[0],
            gamesList = document.getElementsByClassName('games-list')[0];

        buttonsContainer.addEventListener('click', event => {
            const target = event.target,
                targetClassList = target.classList;

            switch (true) {
                case targetClassList.contains('user-info-games-buttons__btn-usersGames'):
                    this.setActiveTabs(buttonsContainer, targetClassList);
                    this.renderUserGames(this.user.collectionGames, gamesList);
                    break;

                case targetClassList.contains('user-info-games-buttons__btn-wishGames'):
                    this.setActiveTabs(buttonsContainer, targetClassList);
                    this.renderUserGames(this.user.wishGames, gamesList);
                    break;

                case targetClassList.contains('user-info-games-buttons__btn-playedGames'):
                    this.setActiveTabs(buttonsContainer, targetClassList);
                    this.renderUserGames(this.user.playedGames, gamesList);
                    break;
            }
        });

        gamesList.addEventListener('click', event => {
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

    setActiveTabs(buttonsContainer, targetClassList) {
        buttonsContainer.getElementsByClassName('active')[0].classList.remove('active');
        targetClassList.add('active');
    }

    renderUserGames(gameIds, gamesList) {
        this.modelGames.getGamesByIds(gameIds).then(games => {
            if (gameIds.length != 0) {
                this.user.renderGames = games;
                gamesList.innerHTML = `${this.user.renderGames.map(game => this.getUsersGames(game)).join('\n ')}`;
            } else {
                gamesList.innerHTML = '<p>Список пуст</p>';
            }
        });
    }

    getUsersGames(game) {
        return `
            <div class="game" data-id="${game._id}">
                <div class="game__img" data-id="${game._id}">
                    <img class="game__img img" data-id="${game._id}" src="${game.img}" alt="namegame"> 
                </div>
            <div class="game__title" data-id="${game._id}">${game.title}</div>
            </div>
        `;
    }
    redirectToGameInfo(id) {
        location.hash = `#/games/${id}`;
    }
}

export default UserInfo;



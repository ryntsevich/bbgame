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
        this.modelMeetings = new Meetings();
    }
    getData() {
        return new Promise(resolve => this.model.getUser(this.request.id).then(user => {
            console.log('user');
            this.modelGames.getGamesByIds(user.collectionGames).then(games => {
                user['renderGames'] = games;
                this.user = user;
                localStorage.setItem('user', JSON.stringify(this.user));
                // console.log(user);
                resolve(user);
            })
        }));
    }


    render(user) {

        return new Promise(resolve => {
            let html;

            if (user) {

                html = `
                <h1 class="page-title">${user.name}</h1>
                <div class="user-info">
                    <div class="user-info__img">
                        <img src="${user.img}" alt="">
                    </div>
                    <div class="user-info__about">
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
                </div>
                <div class = "user-info-meetigs">
                    <a class="user-info-buttons__btn-usersMeetings" href="#/users/${user._id}/meetings">Мои встречи</a>
                </div>
                <div class="user-info-games">
                    <div class="user-info-buttons">
                        <button class="user-info-buttons__btn-usersGames">Моя коллекция</button>
                        <button class="user-info-buttons__btn-wishGames">Хочу поиграть</button>
                        <button class="user-info-buttons__btn-playedGames">Играл</button>
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
        const buttonsContainer = document.getElementsByClassName('user-info-buttons')[0],
            gamesList = document.getElementsByClassName('games-list')[0];

        buttonsContainer.addEventListener('click', event => {
            const target = event.target,
                targetClassList = target.classList;

            switch (true) {
                case targetClassList.contains('user-info-buttons__btn-usersGames'):
                    this.renderUserGames(this.user.collectionGames, gamesList);
                    break;

                case targetClassList.contains('user-info-buttons__btn-wishGames'):
                    this.renderUserGames(this.user.wishGames, gamesList);
                    break;

                case targetClassList.contains('user-info-buttons__btn-playedGames'):
                    this.renderUserGames(this.user.playedGames, gamesList);
                    break;
            }
        });
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
            <div class="game">
                <div class="game__img">
                    <img  src="${game.img}" alt="" width = "100px" height="100px">
                </div>
                <a class="game__title" href="#/games/${game._id}">${game.title}</a>
            </div>        
        `
    }

}

export default UserInfo;



import Component from '../../component.js';
import Users from '../../../models/users.js';
import Error404 from '../../../views/pages/error404.js';
import Games from '../../../models/games.js';


class UserInfo extends Component {
    constructor() {
        super();

        this.model = new Users();
        this.modelGames = new Games();
    }
    getData() {
        return new Promise(resolve => this.model.getUser(this.request.id).then(user => {
            this.modelGames.getGamesByIds(user.usersCollectionGames).then(games => {
                user.usersCollectionGames = games;
                this.user = user;
                resolve(user);
            })
        }));
    }

    render(user) {

        return new Promise(resolve => {
            let html;

            if (user) {
                // const { id, name, img, age, city, male, collection } = user;
                // console.log(user);

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
                        <div class="user-male item">
                            <div class="name">Пол</div>
                            <div class="value">${user.male}</div>
                        </div>
                    </div>
                </div>
                <div class="user-info-games">
                    <div class="buttons">
                        <button class="buttons__btn-usersGames">Моя коллекция</button>
                        <button class="buttons__btn-wishGames">Хочу поиграть</button>
                        <button class="buttons__btn-playedGames">Играл</button>
                    </div>
                    <div class="games">
                        <div class="games-list">
                            ${user.usersCollectionGames.map(game => this.getUsersGames(game)).join('\n ')}
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
        // const buttonUsersGames = document.getElementsByClassName('buttons__btn-usersGames')[0],
        //     buttonWishGames = document.getElementsByClassName('buttons__btn-wishGames')[0],
        //     buttonPlayedGames = document.getElementsByClassName('buttons__btn-playedGames')[0],
        const buttonsContainer = document.getElementsByClassName('buttons')[0],
            gamesList = document.getElementsByClassName('games-list')[0];

        buttonsContainer.addEventListener('click', event => {
            const target = event.target,
                targetClassList = target.classList;


            switch (true) {
                case targetClassList.contains('buttons__btn-usersGames'):

                    this.modelGames.getGamesByIds(this).then(games => {
                        this.user.usersCollectionGames = games;
                        gamesList.innerHTML = `
                        ${this.user.usersCollectionGames.map(game => this.getUsersGames(game)).join('\n ')}
                        `;
                        // resolve(user);
                    });
                    break;

                case targetClassList.contains('buttons__btn-wishGames'):
                    this.redirectToTaskInfo(target.dataset.id);
                    break;

                case targetClassList.contains('buttons__btn-playedGames'):
                    this.changeTaskStatus(target.parentNode.parentNode, target.previousElementSibling, target);
                    break;
            }
        });
    }



    getUsersGames(game) {
        return `
            <div class="game">
                <div class="game__img" data-id="id">
                    <img data-id="id" src="${game.img}" alt="" width = "100px" height="100px">
                </div>
                <a class="game__title" data-id="id" href="#/games/${game.id}">${game.title}</a>
            </div>        
        `
    }
}

export default UserInfo;



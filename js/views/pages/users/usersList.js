import Component from '../../component.js';
import Users from '../../../models/users.js';

class UsersList extends Component {
    constructor() {
        super();

        this.model = new Users();
    }

    getData() {
        return new Promise(resolve => this.model.getUsersList().then(users => resolve(users))
        );
    }

    render(users) {
        return new Promise(resolve => {
            resolve(`
                <h1 class="page-title">Список всех пользователей</h1>
                    <div class="users-list">
                        ${users.map(user => this.getUserHTML(user)).join('\n ')}
                    </div>
            `);
        });
    }
    afterRender() {
        this.setActions();
    }
    setActions() {
        const userList = document.getElementsByClassName('users-list')[0];

        userList.addEventListener('click', event => {
            const target = event.target,
                targetClassList = target.classList;

            switch (true) {
                case targetClassList.contains('user'):
                case targetClassList.contains('user__title'):
                    this.redirectToUserInfo(target.dataset.id);
                    break;
            }
        });
    }

    getUserHTML(user) {
        return `
            <div class="user" data-id="${user._id}">
                <div class="user__title" data-id="${user._id}">${user.username}</div>
            </div>
        `;
    }

    redirectToUserInfo(id) {
        location.hash = `#/users/${id}`;
    }
}

export default UsersList;
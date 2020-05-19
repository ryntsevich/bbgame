import Component from '../../component.js';

// import Error404 from '../../../views/pages/error404.js';

import Users from '../../../models/users.js';

class UsersList extends Component {
    constructor() {
		super();
		
		this.model = new Users();
	}
	
	getData() {
		return new Promise(resolve => this.model.getUsersList().then(users => resolve(users)));
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

    getUserHTML(user) {
        return `
            <div class="user">
                <a class="user__title" data-id="${user.id}" href="#/users/${user.id}">${user.name}</a>
            </div>
        `;
    }


}

export default UsersList;
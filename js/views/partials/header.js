import Component from '../component.js';

class Header extends Component {
    render() {
        const resource = this.request.resource;
        return new Promise(resolve => {
            const user = JSON.parse(localStorage.getItem('user'));
            resolve(`
            <header class="header">
                <div class="header-links">
                    <a class="header-links__link ${!resource ? 'active' : ''}" href="/#/">
                        Sign In
                    </a>
                    <a class="header-links__link ${resource === 'games' ? 'active' : ''}" href="/#/games">
                        Все игры
                    </a>
                    <a class="header-links__link ${resource === 'users' ? 'active' : ''}" href="/#/users">
                        Пользователи
                    </a>
                    <a class="header-links__link ${resource === 'meetings' ? 'active' : ''}" href="/#/meetings">
                        Встречи
                    </a>
                </div>
                <div class="header-user">
                    <img class ="header-user__img" src="images/avatar.jpg" alt="" width="25px" height="25px">
                    <a class="header-user__nameUser" href="#/users/${user._id}">${user.username}</a>
                </div>
            </header>
            `);
        });
    }
}

export default Header;
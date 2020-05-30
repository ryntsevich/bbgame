import Component from '../component.js';

class Header extends Component {
    render() {
        const resource = this.request.resource;
        return new Promise(resolve => {
            const user = JSON.parse(localStorage.getItem('user'));
            resolve(`
        <header class="header">
            <div class ="header-user">
                <img class ="header-user__img" src="${user.img}" alt="img" width ="23px" heigth="23px">
                <a class="header-user__nameUser" href="#/users/${user._id}">${user.username}</a>
            </div>
            <input class="menu-btn" type="checkbox" id="menu-btn">
            <label class="menu-icon" for="menu-btn"><span class="navicon"></span></label>
                <ul class="menu">
                   <li><a  href="/#/">
                        Sign In
                    </a></li>
                    <li><a  href="/#/games">
                        Все игры
                    </a></li>
                    <li><a  href="/#/users">
                        Пользователи
                    </a></li>
                    <li><a  href="/#/meetings">
                        Встречи
                    </a></li>
                </ul>
        </header>
            `);
        });
    }
}

export default Header;
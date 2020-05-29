import Component from '../../component.js';
import Users from '../../../models/users.js';
import Error404 from '../../../views/pages/error404.js';


class UserEdit extends Component {
    constructor() {
        super();

        this.modelUsers = new Users();
    }
    getData() {
        return new Promise(resolve => this.modelUsers.getUser(this.request.id).then(user => {
            this.user = user;
            localStorage.setItem('user', JSON.stringify(this.user));
            resolve(user);

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
                        <img src="${user.img}" alt="">
                    </div>
                    <div class="user-info__about">
                        <div class="user-name item">
                            <div class="name">Имя</div>
                            <input class="value name-edit" type ="text" value="${user.name}">
                        </div>
                        <div class="user-city item">
                            <div class="name">Город</div>
                            <input class="value city-edit" type ="text" value="${user.city}">
                        </div>
                        <div class="user-age item">
                            <div class="name">Возраст</div>
                            <input class="value age-edit" type="number" value="${user.age}">
                        </div>
                        <div class="user-gender item">
                            <div class="name">Пол</div>
                            <label>
                                <input class="value" type="radio" name="gender-edit" value="Мужской" ${user.gender === 'Мужской' && 'checked'}>
                                Мужской
                            </label>
                            <label>
                                <input class="value" type="radio" name="gender-edit" value="Женский" ${user.gender === 'Женский' && 'checked'}>
                                Женский
                            </label>
                        </div>
                    </div>
                    <div class = "user-info__buttons">
                        <a class="user-info-buttons__btn-saveUserPage">Сохранить</a>
                        <a class="user-info-buttons__btn-cancelUserPage" href="#/users/${user._id}">Отмена</a>
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
        const btnSaveUser = document.getElementsByClassName('user-info-buttons__btn-saveUserPage')[0],
            editName = document.getElementsByClassName('name-edit')[0],
            editCity = document.getElementsByClassName('city-edit')[0],
            editAge = document.getElementsByClassName('age-edit')[0],
            editGender = document.getElementsByName('gender-edit');

        btnSaveUser.addEventListener('click', () => this.editUser(editName, editCity, editAge, editGender));
    }

    editUser(editName, editCity, editAge, editGender) {
        this.user.name = editName.value.trim();
        this.user.city = editCity.value.trim();
        this.user.age = editAge.value.trim();
        this.user.gender = this.getValueGender(editGender);


        try {
            if (!editCity.value.trim()) {
                throw 'Заполните поле "Город"';
            }
            if (!editName.value.trim()) {
                throw 'Заполните поле "Имя"';
            }
            if (!editAge.value.trim()) {
                throw 'Заполните поле "Возраст"';
            }

            this.modelUsers.editUser(this.user).then(user => this.redirectToUserInfo(this.user._id));
        }
        catch (e) {
            alert(e);
        }



    }

    getValueGender(editGender) {
        return Array.from(editGender).find(elem => elem.checked).value;
    }

    redirectToUserInfo(id) {
        location.hash = `#/users/${id}`;
    }
}

export default UserEdit;



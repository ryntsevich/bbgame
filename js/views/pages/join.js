import Component from '../component.js';
import Users from '../../models/users.js';

class SignUp extends Component {
  constructor() {
    super();

    this.modelUsers = new Users();
  }
  render() {
    return new Promise(resolve => {
      resolve(`
      <div class="form-signup-container">
          <div class="form-signup">
              <p class="form-signup__title">Регистрация</p>
              <div class="form-signup__item">
                  <label for="file">Фото для профиля</label>
                  <input class = "form-sign-img" type="file" name="file">
                </div>
              <div class="form-signup__item">
                  <label for="name">Имя</label>
                  <input class ="form-signup-name" type="text" name="name" placeholder="Name" >
              </div>
              <div class="form-signup__item">
                  <label for="login">Логин</label>
                  <input class ="form-signup-login" type="text" name="login" placeholder="Login">
              </div>
              <div class="form-signup__item">
                  <label for="email">E-mail</label>
                  <input class ="form-signup-email" type="email" name="email" placeholder="Email" >
              </div>
              <div class="form-signup__item">
                  <label for="password">Пароль</label>
                  <input class ="form-signup-password" type="password" name="password" placeholder="Password" >
              </div>
              <div class="form-signup__item">
                  <label for="city">Город</label>
                  <input class ="form-signup-city" name="city" type="text" placeholder="City" >
              </div>
              <div class="form-signup__item">
                  <label for="age">Возраст</label>
                  <input class ="form-signup-age" name="age" type="number" min="15" max="100" placeholder="Age" >
              </div>
              <div class="form-signup__item">
                  <label>Пол<br/></label>
                  <label>
                    <input type="radio" name="gender" value="Мужской" checked>
                    Мужской
                  </label>
                  <label>
                      <input type="radio" name="gender" value="Женский">
                    Женский
                  </label>
              </div>
              <button class="form-signup__item btn-signup button" disabled>Отправить</button>
          </div>
      </div>
            `);
    });
  }

  afterRender() {
    this.setActions();
  }

  setActions() {
    const btnAddUser = document.getElementsByClassName('btn-signup')[0],
      addImg = document.getElementsByClassName('form-sign-img')[0],
      addNameUser = document.getElementsByClassName('form-signup-name')[0],
      addLoginUser = document.getElementsByClassName('form-signup-login')[0],
      addEmailUser = document.getElementsByClassName('form-signup-email')[0],
      addPasswordUser = document.getElementsByClassName('form-signup-password')[0],
      addCityUser = document.getElementsByClassName('form-signup-city')[0],
      addAgeUser = document.getElementsByClassName('form-signup-age')[0],
      addGenderUser = document.getElementsByName('gender'),
      formContainer = document.getElementsByClassName('form-signup')[0];



    formContainer.addEventListener('keyup', () => {
      this.changeButtonStatus(addNameUser, addLoginUser, addEmailUser, addPasswordUser, addCityUser, addAgeUser, addGenderUser, btnAddUser);
    });
    btnAddUser.addEventListener('click', () => this.addNewUser(addImg, addNameUser, addLoginUser, addEmailUser, addPasswordUser, addCityUser, addAgeUser, addGenderUser));
  }

  addNewUser(addImg, addNameUser, addLoginUser, addEmailUser, addPasswordUser, addCityUser, addAgeUser, addGenderUser) {
    const newUser = {
      img: addImg.value,
      name: addNameUser.value.trim(),
      username: addLoginUser.value.trim(),
      email: addEmailUser.value.trim(),
      password: addPasswordUser.value.trim(),
      city: addCityUser.value.trim(),
      age: addAgeUser.value.trim(),
      gender: this.getValueGender(addGenderUser)
    }

    this.modelUsers.addUser(newUser).then(user => {
      console.log(user);
      this.redirectToUserInfo(user._id)
    });

  }

  getValueGender(addGenderUser) {
    for (var i = 0; i < addGenderUser.length; i++) {
      if (addGenderUser[i].checked) {
        return addGenderUser[i].value;
      }
    }
  }


  changeButtonStatus(addNameUser, addLoginUser, addEmailUser, addPasswordUser, addCityUser, addAgeUser, addGenderUser, btnAddUser) {
    const obj = [addNameUser, addLoginUser, addEmailUser, addPasswordUser, addCityUser];
    btnAddUser.disabled = !(addAgeUser.value.length && obj.every(elem => elem.value.trim()));
  }

  redirectToUserInfo(id) {
    location.hash = `#/users/${id}`;
  }

}

export default SignUp;
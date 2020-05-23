import Component from '../component.js';

class SignUp extends Component {
  render() {
    return new Promise(resolve => {
      resolve(`
      <div class="form-signup-container">
          <form class="form-signup" action="">
              <p class="form-signup__title">Регистрация</p>
              <div class="form-signup__item">
                  <label for="file">Фото для профиля</label>
                  <input type="file" name="file" id="file" class="inputfile form-signup-avatar" />
                </div>
              <div class="form-signup__item">
                  <label for="name">Имя</label>
                  <input type="text" name="name" placeholder="Name" required>
              </div>
              <div class="form-signup__item">
                  <label for="email">E-mail</label>
                  <input type="email" name="email" placeholder="Email" required>
              </div>
              <div class="form-signup__item">
                  <label for="password">Пароль</label>
                  <input type="password" name="password" placeholder="Password" required>
              </div>
              <button class="form-signup__item btn-signup button" type="submit">Отправить</button>
          </form>
      </div>
            `);
    });
  }


}

export default SignUp;
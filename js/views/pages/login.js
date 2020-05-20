import Component from '../component.js';

class Login extends Component {
  render() {
    return new Promise(resolve => {
      resolve(`
      <div class ="form-login-container">
          <div class="form-login-img">
            <img src="images/dice3.png" alt="dice" class="dice">
          </div>
          <form class="form-login" action="">
            <p class="form-login__title">Войти</p>
            <input class="form-login__email form-elem" type="text" name="email" placeholder="Email" required>
            <input class="form-login__password form-elem" type="password" name="password" placeholder="Password" required>
            <input class="form-login__btn-login button" type="submit" value="Вход">
            <input class="form-login__btn-registration button" type="submit" value="Регистрация">
          </form>   
      </div>           
            `);
    });
  }
}

export default Login;
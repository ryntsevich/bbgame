import Component from '../component.js';

class Login extends Component {
  render() {
    return new Promise(resolve => {
      resolve(`
      <div class ="form-login-container">
          <div class="form-login-img">
            <img src="images/dice3.png" alt="dice" class="dice">
          </div>
          <div class="form-login" >
            <p class="form-login__title">Войти</p>
            <input class="form-login__email form-elem" type="text" name="email" placeholder="Email" required>
            <input class="form-login__password form-elem" type="password" name="password" placeholder="Password" required>
            <input class="form-login__btn-login button" type="submit" value="Вход">
            <input class="form-login__btn-registration button" type="submit" value="Регистрация">
          </div>   
      </div>           
            `);
    });
  }
  afterRender() {
    this.setActions();
  }

  setActions() {
    const btnSignUp = document.getElementsByClassName('form-login__btn-registration button')[0],
      btnSingIn = document.getElementsByClassName('form-login__btn-login button')[0],
      loginEmail = document.getElementsByClassName('form-login__email form-elem')[0],
      loginPassword = document.getElementsByClassName('form-login__password form-elem')[0];

    btnSignUp.addEventListener('click', () => this.redirectToFormRegistration());
    btnSingIn.addEventListener('click', () => this.login({ username: loginEmail.value, password: loginPassword.value }));
  }

  redirectToFormRegistration() {
    location.hash = `#/join`;
  }

  login(credentialns) {
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest();

      xhr.open('POST', 'http://localhost:3000/api/login');
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onload = () => resolve(JSON.parse(xhr.response));
      
    xhr.send(JSON.stringify(credentialns));
  });
}
}

export default Login;
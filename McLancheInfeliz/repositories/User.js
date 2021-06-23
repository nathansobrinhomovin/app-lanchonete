const url = 'https://mobile-feso-api.herokuapp.com/api/auth';

export default class UsersRepository {
  async login(user, onSuccess, onError) {
    return fetch(url + "/login", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          email: user.email,
          password: user.senha
        })
    })
      .then((response) => response.json())
      .then((json) => {
        onSuccess({rows: json});
      })
      .catch((error) => {
        alert(error);
        onError(error);
      });
  }

  async sigin(user, onSuccess, onError) {
    return fetch(url + "/register", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.senha,
        })
    })
      .then((response) => response.json())
      .then((json) => {
        onSuccess({rows: json});
      })
      .catch((error) => {
        alert(error);
        onError(error);
      });
  }

  async confirm(code, onSuccess, onError) {
    return fetch(url + "/verify-otp", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          email: code.email,
          otp: code.code,
        })
    })
      .then((response) => response.json())
      .then((json) => {
        onSuccess({rows: json});
      })
      .catch((error) => {
        alert(error);
        onError(error);
      });
  }

  async resend(code, onSuccess, onError) {
    return fetch(url + "/resend-verify-otp", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          email: code.email,
        })
    })
      .then((response) => response.json())
      .then((json) => {
        onSuccess({rows: json});
      })
      .catch((error) => {
        alert(error);
        onError(error);
      });
  }
}
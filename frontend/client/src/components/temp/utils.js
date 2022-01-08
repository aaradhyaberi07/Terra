export async function login(usernameL, passwordL) {
  return fetch("https://terra-backend-server.herokuapp.com/auth/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: usernameL,
      password: passwordL,
    }),
  }).then((data) => data.json());
}

export async function register(emailR, usernameR, passwordR, typeR) {
  return fetch(`https://terra-backend-server.herokuapp.com/auth/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: emailR,
      username: usernameR,
      password: passwordR,
      type: typeR,
    }),
  }).then((data) => data.json());
}

export async function getProfile(token) {
  return fetch(`https://terra-backend-server.herokuapp.com/auth/profile/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((data) => data.json());
}

export async function upProfile(nameR, ageR, sexR, token, username) {
  return fetch(
    `https://terra-backend-server.herokuapp.com/auth/profile/${username}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: nameR,
        age: ageR,
        sex: sexR,
      }),
    }
  ).then((data) => data.json());
}

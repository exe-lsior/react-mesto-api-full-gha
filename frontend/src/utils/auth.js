export const BASE_URL = "https://api.mestechko.nomoredomains.rocks";

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      email,
    }),
  }).then(getResponse);
};

const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      email,
    }),
  }).then(getResponse);
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      'authorization': `Bearer ${token}`
    },
  }).then(getResponse);
};

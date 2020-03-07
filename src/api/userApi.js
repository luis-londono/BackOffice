import axios from "axios";

const baseUrl = process.env.REACT_APP_USER_API_BASE_URL;

export async function getUsers() {
  return axios.get(baseUrl);
}

export async function deleteUser(userId) {
  return axios.delete(baseUrl + userId);
}

export async function saveUser(user) {
  return user.id
    ? axios.put(baseUrl + user.id, user)
    : axios.post(baseUrl, user);
}

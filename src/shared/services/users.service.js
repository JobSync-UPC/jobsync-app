import axios from "axios";
import {usersBaseUrl} from "../../apiConfig.js";

const http = axios.create({
  baseURL: usersBaseUrl
});

export class UsersApiService {
  getAll() {
    return http.get(``);
  }
  getById(id) {
    return http.get(`${id}`);
  }
  updateById(id, data) {
    return http.put(`${id}`, data);
  }
  deleteById(id) {
      return http.delete(`${id}`);
  }
  enableById(id) {
    return http.put(`enable/${id}`);
  }
  disableById(id) {
      return http.put(`disable/${id}`);
  }
}
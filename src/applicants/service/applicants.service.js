import axios from "axios";
import {applicantsBaseUrl } from "../../apiConfig.js";

const http = axios.create({
    baseURL: applicantsBaseUrl
});

export class ApplicantsService {
    getAll() {
        return http.get(``);
    }
    getById(id) {
        return http.get(`${id}`);
    }
    updateById(id, data) {
        return http.put(`${id}`, data);
    }
}
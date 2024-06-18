import axios from "axios";
import {emailUrl} from "../../apiConfig.js";

const http = axios.create({
    baseURL: emailUrl
});

export class EmailService {
    getSentEmailsByUserId(userId) {
        return http.get(`sent/${userId}`);
    }
    getReceivedEmailsByUserId(userId) {
        return http.get(`received/${userId}`);
    }
    sendEmail(email) {
        return http.post('send', email);
    }
}
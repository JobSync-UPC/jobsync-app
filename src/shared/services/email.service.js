import axios from "axios";
import {emailUrl} from "../../apiConfig.js";

const http = axios.create({
    baseURL: emailUrl
});

export class EmailService {
    sendEmail(email) {
        return http.post('send', email);
    }
}
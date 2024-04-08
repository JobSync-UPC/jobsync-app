import axios from "axios";

const BASE_URL = "https://jobsyncapitestigosvue.azurewebsites.net/api/v1/recruitment/phases";

const http = axios.create({
    baseURL: BASE_URL
});

export class PhaseApiService {
    create(data) {
        return http.post('', data);
    }
}
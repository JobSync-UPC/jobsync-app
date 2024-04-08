import axios from "axios";

const BASE_URL = "https://jobsyncapitestigosvue.azurewebsites.net/api/v1/enterprise/organizations";

const http = axios.create({
    baseURL: BASE_URL
});

export class OrganizationService {
    getAll() {
        return http.get('');
    }

    getById(id) {
        return http.get(`/${id}`);
    }

    create(data) {
        return http.post('', data);
    }
}
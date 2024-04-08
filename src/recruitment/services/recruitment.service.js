import axios from "axios";

const BASE_URL = "https://jobsyncapitestigosvue.azurewebsites.net/api/v1/recruitment/processes";

const http = axios.create({
  baseURL: BASE_URL
});

export class RecruitmentApiService {
  getAll() {
    return http.get('');
  }

  getById(id) {
    return http.get(`/${id}`);
  }

  getPhases(id) {
    return http.get(`/${id}/phases`);
  }

  create(data) {
    return http.post('', data);
  }
}
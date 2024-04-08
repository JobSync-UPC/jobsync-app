import axios from "axios";

const http = axios.create({
  baseURL: 'http://localhost:3000/api/v1'
});

export class OrganizationApiService {
  getAll() {
    return http.get(`organizations`);
  }

  getCurrentOrganization(id){
    return http.get(`organizations/${id}`)
  }
}
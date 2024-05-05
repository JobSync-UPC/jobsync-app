import axios from "axios";
import {jobPostsBaseUrl, recruitmentProcessesBaseUrl} from "../../apiConfig.js";

const http = axios.create({
  baseURL: recruitmentProcessesBaseUrl
});


export class RecruitmentApiService {
  getRecruitmentProcessesByCompanyId(companyId) {
    return http.get(`/company/${companyId}`);
  }
}